import { useEffect, useRef, useState } from 'react';

const HELP = [
  'help                도움말 표시', 'whoami              자기소개', 'about               소개',
  'skills              기술 스택', 'projects            프로젝트 목록', 'open <id>           프로젝트 상세 열기',
  'education           교육 및 수상', 'contact             연락처', 'ping [target]       네트워크 레이턴시 시뮬레이션',
  'netstat             연결 상태 확인', 'date                현재 시간', 'echo <text>         입력 그대로 출력',
  'clear               화면 지우기', 'exit                터미널 닫기',
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Terminal({ open, onClose, onOpenProject, data }) {
  const { profile, about, skills, projects, education } = data;
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (open && lines.length === 0) {
      idRef.current = 0;
      setLines([
        { id: idRef.current++, kind: 'system', text: `${profile.handle} portfolio shell v1.0` },
        { id: idRef.current++, kind: 'system', text: "'help' 를 입력해 사용 가능한 명령어를 확인하세요." },
      ]);
    }
    if (open) inputRef.current?.focus();
  }, [open, lines.length, profile.handle]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, open]);

  const push = (kind, text) => setLines((prev) => [...prev, { id: idRef.current++, kind, text }]);
  const pushMany = (kind, items) => setLines((prev) => [
    ...prev,
    ...items.map((text) => ({ id: idRef.current++, kind, text })),
  ]);

  async function run(raw) {
    const trimmed = raw.trim();
    push('input', trimmed);
    if (!trimmed) return;
    const [cmd, ...args] = trimmed.split(/\s+/);

    switch (cmd) {
      case 'help': pushMany('output', HELP); break;
      case 'whoami': pushMany('output', [profile.handle, profile.role, profile.terminalIntro]); break;
      case 'about': pushMany('output', about); break;
      case 'skills': pushMany('output', skills.map(([name, value]) => `${name.padEnd(14)} ${value}`)); break;
      case 'projects':
        pushMany('output', [...projects.map((project) => `${project.id.padEnd(14)} ${project.title}`), '', "'open <id>' 로 상세 정보를 볼 수 있습니다."]);
        break;
      case 'open': {
        const target = projects.find((project) => project.id === args[0]);
        if (!target) { push('error', `open: project not found: ${args[0] ?? ''} (try 'projects')`); break; }
        push('output', `Opening ${target.title} ...`);
        onOpenProject(target);
        onClose();
        break;
      }
      case 'education':
        pushMany('output', education.flatMap((entry) => [`${entry.title} (${entry.period})`, ...entry.items.map((item) => `  - ${item}`)]));
        break;
      case 'contact': pushMany('output', [`email   ${profile.email}`, `github  ${profile.github}`]); break;
      case 'netstat':
        pushMany('output', ['Proto  Local Address       Foreign Address        State', 'tcp    127.0.0.1:8080      craweb-api:https       ESTABLISHED', 'tcp    127.0.0.1:9000      loadbalancer:tcp       ESTABLISHED', 'tcp    127.0.0.1:5432      mysql-db:5432          ESTABLISHED', 'tcp    127.0.0.1:6379      redis-token:6379       ESTABLISHED', 'udp    127.0.0.1:3000      pointcloud-stream:*    LISTEN']);
        break;
      case 'ping': {
        const target = args[0] || 'pointcloud-stream';
        setBusy(true);
        push('output', `PING ${target}: 56 data bytes`);
        const samples = [612, 398, 201, 130];
        for (let index = 0; index < samples.length; index += 1) {
          await wait(260);
          push('output', `64 bytes from ${target}: icmp_seq=${index} ttl=64 time=${samples[index]}.0 ms`);
        }
        await wait(200);
        pushMany('output', [`--- ${target} ping statistics ---`, '4 packets transmitted, 4 received, 0% packet loss', `min/avg/max = ${Math.min(...samples)}/335/${Math.max(...samples)} ms`, '(Point Cloud 프로젝트에서 프레임 스킵 + 병렬 처리로 이 지연을 실제로 개선했습니다)']);
        setBusy(false);
        break;
      }
      case 'date': push('output', new Date().toString()); break;
      case 'echo': push('output', args.join(' ')); break;
      case 'sudo': push('error', `Permission denied: ${profile.handle} is not in the sudoers file. (여긴 그냥 포트폴리오입니다)`); break;
      case 'clear': setLines([]); break;
      case 'exit': case 'close': onClose(); break;
      default: push('error', `command not found: ${cmd} (type 'help')`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (busy || !input.trim()) return;
    const value = input;
    setInput('');
    setHistory((prev) => [...prev, value]);
    setHistIndex(-1);
    run(value);
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      const nextIndex = histIndex < 0 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (histIndex < 0) return;
      const nextIndex = histIndex + 1;
      if (nextIndex >= history.length) { setHistIndex(-1); setInput(''); } else { setHistIndex(nextIndex); setInput(history[nextIndex]); }
    } else if (event.key === 'Escape') onClose();
  }

  if (!open) return null;
  return (
    <div className="terminal-window" role="dialog" aria-label="터미널">
      <div className="terminal-header">
        <div className="terminal-dots">
          <button type="button" className="terminal-dot-close" onClick={onClose} aria-label="터미널 닫기" />
          <span /><span />
        </div>
        <span className="terminal-title">{profile.handle}@portfolio: ~</span>
      </div>
      <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((line) => <div className={`terminal-line ${line.kind}`} key={line.id}>{line.kind === 'input' ? <><span className="terminal-prompt">{profile.handle}@portfolio:~$</span> {line.text}</> : (line.text || ' ')}</div>)}
        <form className="terminal-input-row" onSubmit={handleSubmit}>
          <span className="terminal-prompt">{profile.handle}@portfolio:~$</span>
          <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} disabled={busy} autoComplete="off" spellCheck="false" aria-label="터미널 입력" />
        </form>
      </div>
    </div>
  );
}
