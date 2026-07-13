import React, { useEffect, useState } from 'react';

const navItems = [
  ['home', 'Main'],
  ['about', 'About'],
  ['strengths', 'Strengths'],
  ['projects', 'Projects'],
  ['cases', 'Case Studies'],
  ['skills', 'Skills'],
  ['education', 'Education'],
];

const skills = [
  ['Backend', 'Java, Spring Boot, Spring Security, Node.js, C/C++'],
  ['Frontend', 'React.js, Flutter'],
  ['Database', 'MySQL'],
  ['Infra/DevOps', 'Docker, GitHub Actions, AWS EC2, AWS S3, AWS RDS'],
  ['Monitoring', 'Grafana, Loki, Prometheus, Logback, SLF4J'],
  ['Etc', 'Socket Programming, Multi-threading, TCP/IP, Unity(C#)'],
];

const education = [
  {
    id: 'handong',
    title: '한동대학교',
    period: 'AI컴퓨터공학심화 전공, GPA 4.03',
    items: ['SW페스티벌 소프트웨어 공모전 2위', '알고리즘 대회 3위', 'KCC 2024 장려상'],
  },
  {
    id: 'ssafy',
    title: 'SSAFY 15기',
    period: '2026.01 - 현재',
    items: ['삼성 SW 역량테스트 B형 취득', '알고리즘, 웹 개발, 협업 프로젝트 기반 학습 진행', '1학기 성적우수상 수상'],
  },
];

const projects = [
  {
    id: 'craweb',
    title: 'CRA 동아리 공식 웹사이트',
    tags: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'AWS', 'Docker'],
    summary: '한동대학교 전산 동아리 CRA의 리크루팅과 커뮤니티 운영을 위한 웹 서비스입니다.',
    architecture: [
      ['React SPA', 'Vite, TypeScript, TanStack Query, Zustand'],
      ['REST API', 'Spring Boot, Controller, DTO, Swagger'],
      ['Domain', 'Auth, Board, Comment, Project, Item, File'],
      ['Storage', 'MySQL/JPA, Redis token, S3 files'],
      ['Ops', 'Docker, GitHub Actions, Grafana, Loki'],
    ],
    support: [
      ['Auth', 'Spring Security + JWT + refresh token'],
      ['Search', 'Hibernate Search + Lucene title boost'],
      ['Monitoring', 'Actuator + Prometheus metrics + Logback logs'],
    ],
    roles: [
      '게시글, 유저, 인증/권한 중심의 REST API 구현',
      'BE/FE 통합 CI/CD 파이프라인 구성',
      'S3 이미지 업로드와 임시 파일 이동 플로우 정리',
      '운영 로그와 메트릭 수집을 위한 모니터링 스택 구성',
    ],
    trouble: [
      ['좋아요 정합성과 N+1', '게시글과 유저를 직접 다대다로 연결하던 구조를 BoardLike 중간 엔티티로 분리하고 Fetch Join, DB 유니크 제약을 적용해 중복 좋아요와 조회 비용을 줄였습니다.'],
      ['운영 장애 추적', '서버 실행 로그만으로는 원인 추적이 어려워 Logback, Loki, Prometheus, Grafana를 연결해 로그와 메트릭을 함께 확인하도록 구성했습니다.'],
      ['S3 이미지 라이프사이클', '본문 저장 전 업로드된 이미지를 temp 경로에 두고 저장 시 BOARD/PROJECT 경로로 이동하도록 정리해 미사용 파일 관리를 쉽게 만들었습니다.'],
    ],
    result: '동아리 리크루팅과 커뮤니티 운영에 필요한 백엔드, 배포, 관측 경험을 함께 쌓았습니다.',
  },
  {
    id: 'pointcloud',
    title: 'Point Cloud 실시간 스트리밍 서버',
    visual: 'pointcloud',
    tags: ['C/C++', 'Socket', 'TCP', 'CUDA', 'Multi-threading'],
    summary: 'LiDAR 기반 3D Point Cloud 데이터를 여러 기기 간 실시간으로 송수신하는 C/C++ 소켓 통신 시스템입니다.',
    architecture: [
      ['LiDAR Input', '3D Point Cloud frame 수집'],
      ['Preprocess', '다운샘플링, depth 전송 주기 조정'],
      ['Socket Server', 'C/C++, session, multi-threading'],
      ['Merge/Stream', '다중 클라이언트 데이터 병합/전송'],
      ['Clients', '여러 기기에서 실시간 수신/렌더링'],
    ],
    support: [
      ['Protocol', '프레임 단위 송수신 구조 설계'],
      ['Optimization', '프레임 스킵 + 병렬 처리'],
      ['Result', '전송 지연 600ms -> 130ms'],
    ],
    roles: [
      '통신 프로토콜 설계 및 서버 환경 구현',
      '다중 클라이언트 데이터 병합 처리 구현',
      '프레임 스킵, 병렬 처리, 다운샘플링으로 전송 지연 개선',
      '국내 학술 논문 게재 및 KCC 2024 장려상 수상',
    ],
    trouble: [
      ['대용량 프레임 지연', 'Point Cloud 데이터는 프레임 크기가 커서 네트워크 지연이 누적됐습니다. depth 정보를 매 프레임 보내지 않고 7프레임당 1회 전송하도록 조정해 전송량을 줄였습니다.'],
      ['다중 수신 안정성', '클라이언트별 세션과 송수신 타이밍을 분리하고 병렬 처리 구조를 적용해 한 클라이언트의 지연이 전체 스트림을 막지 않도록 개선했습니다.'],
    ],
    result: '실시간 3D 데이터 전송 지연을 약 4.6배 개선하며 저수준 네트워크와 성능 최적화 경험을 확보했습니다.',
  },
  {
    id: 'loadbalancer',
    title: 'L4 TCP 로드밸런서',
    visual: 'network',
    tags: ['C', 'Raw Socket', 'TCP/IP', 'NAT', 'Checksum'],
    summary: 'Raw Socket으로 IP/TCP 헤더를 직접 조작하며 L4 로드밸런싱과 NAT 테이블을 구현한 네트워크 프로젝트입니다.',
    architecture: [
      ['Client', 'TCP request'],
      ['L4 Balancer', 'Raw Socket, packet parsing'],
      ['NAT Table', 'client/backend mapping'],
      ['Backend Pool', 'round-robin server selection'],
      ['Response', 'reverse NAT + checksum rewrite'],
    ],
    support: [
      ['Packet', 'IP/TCP header parse and rewrite'],
      ['Routing', 'backend selection and reverse mapping'],
      ['Reliability', 'checksum recalculation'],
    ],
    roles: [
      'IP/TCP 헤더 파싱과 체크섬 재계산 구현',
      'NAT 매핑 테이블과 응답 경로 복원 로직 구현',
      '라운드로빈 기반 백엔드 선택 로직 구현',
    ],
    trouble: [
      ['체크섬 불일치', '패킷 헤더를 수정한 뒤 체크섬을 다시 계산하지 않아 응답 패킷이 드롭됐습니다. IP/TCP 체크섬 재계산을 분리해 수정 후 항상 갱신되도록 만들었습니다.'],
      ['양방향 매핑', '요청과 응답의 주소 변환 방향이 달라 세션 식별이 꼬였습니다. NAT 테이블에 원본 클라이언트와 선택된 백엔드를 함께 기록해 응답 복원을 안정화했습니다.'],
    ],
    result: '커널 추상화 아래의 TCP/IP 동작을 코드 수준에서 검증하며 네트워크 시스템 이해도를 높였습니다.',
  },
  {
    id: 'itaxi',
    title: 'iTaxi',
    visual: 'taxi',
    tags: ['Flutter', 'Firebase', 'Location', 'Matching'],
    summary: '대학생의 택시 합승을 돕는 매칭 애플리케이션입니다.',
    architecture: [
      ['Mobile App', 'Flutter UI and route flow'],
      ['Auth/Data', 'Firebase Auth, Firestore'],
      ['Matching', 'departure/destination/time based room'],
      ['Location', 'map and coordinate data'],
      ['Notification', 'matching status feedback'],
    ],
    support: [
      ['User Flow', '탑승 조건 입력 -> 매칭방 생성/참여'],
      ['Data', 'Firestore 기반 실시간 상태 관리'],
      ['UX', '모바일 중심 합승 플로우'],
    ],
    roles: [
      'Flutter 화면 구성과 사용자 플로우 구현',
      'Firebase 기반 인증/데이터 저장 구조 설계',
      '위치 기반 합승 매칭 시나리오 정리',
    ],
    trouble: [
      ['매칭 조건 과다', '출발지, 도착지, 시간 조건이 많아 사용자가 매칭방을 찾기 어려웠습니다. 입력 조건을 단계화하고 리스트 정보를 줄여 탐색 부담을 낮췄습니다.'],
      ['실시간 상태 관리', '여러 사용자가 같은 매칭방을 볼 때 상태 동기화가 필요했습니다. Firestore 문서 중심으로 참여 상태를 관리하도록 구조를 단순화했습니다.'],
    ],
    result: '모바일 환경에서 위치 기반 서비스의 데이터 흐름과 사용자 경험을 설계한 프로젝트입니다.',
  },
  {
    id: 'donggong',
    title: '동공확장',
    tags: ['React', 'Firebase', 'Redux Toolkit', 'Firestore', 'Ticketing'],
    summary: '공연 예매, 좌석 선택, 관리자 기능을 제공하는 Firebase 기반 티켓팅 웹 서비스입니다.',
    architecture: [
      ['React Router', 'Main, Login, Host, MyPage, Admin routes'],
      ['State', 'Redux Toolkit + redux-persist session storage'],
      ['Firebase', 'Auth, Firestore, Storage'],
      ['Ticketing', 'seat states and reservation progress'],
      ['Admin', 'show, ticket, payment status management'],
    ],
    support: [
      ['Seat State', 'AVAILABLE, PROGRESS, COMPLETED 상태 관리'],
      ['Reservation', '15분 만료 기준의 진행 중 좌석 처리'],
      ['Persistence', '세션 스토리지 기반 유저/공연 상태 유지'],
    ],
    roles: [
      'React Router 기반 페이지 구조와 상태 흐름 파악',
      'Firestore 좌석/예매 상태 갱신 로직 분석 및 포트폴리오 반영',
      '공연 예매 서비스의 관리자/사용자 흐름 정리',
    ],
    trouble: [
      ['좌석 동시성', '좌석은 AVAILABLE, PROGRESS, COMPLETED 상태로 분리하고 진행 중 좌석에는 만료 시간을 둬 결제 중 이탈된 좌석을 다시 사용할 수 있도록 설계했습니다.'],
      ['상태 유지', '새로고침 시 사용자와 공연 정보가 사라지지 않도록 redux-persist와 session storage를 사용해 필요한 상태를 유지했습니다.'],
    ],
    result: 'React와 Firebase를 활용한 실시간 예매 도메인의 상태 관리와 데이터 모델링 경험을 보여주는 프로젝트입니다.',
  },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16v12H4z" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" strokeWidth="1.8" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 19c-4 1.2-4-2-5.5-2.5" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15 22v-3.9c0-1 .1-1.5-.5-2 2.9-.3 5.9-1.4 5.9-6.4 0-1.4-.5-2.6-1.3-3.5.1-.3.6-1.8-.1-3.5 0 0-1-.3-3.6 1.3-1-.3-2.1-.4-3.2-.4s-2.2.1-3.2.4C6.4 2.4 5.4 2.7 5.4 2.7c-.7 1.7-.2 3.2-.1 3.5C4.5 7.1 4 8.3 4 9.7c0 5 3 6.1 5.9 6.4-.4.4-.7 1-.7 2V22" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="card project">
      <div className="project-title">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="tags">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <button className="project-action" type="button" onClick={() => onOpen(project)}>
        상세 보기
      </button>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="닫기">×</button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-block architecture-block">
              <h4>아키텍처 구조</h4>
              <div className="arch-diagram">
                <div className="arch-flow">
                  {project.architecture.map(([name, desc], index) => (
                    <div className={`arch-node ${['', 'teal', 'green', 'amber', 'rose'][index % 5]}`} key={name}>
                      <strong>{name}</strong>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
                <div className="arch-support">
                  {project.support.map(([name, desc]) => (
                    <div key={name}><strong>{name}</strong>{desc}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="detail-block">
              <h4>역할과 주요 기능</h4>
              <ul>
                {project.roles.map((role) => <li key={role}>{role}</li>)}
              </ul>
            </div>
            <div className="detail-block">
              <h4>트러블슈팅 / 성능 개선</h4>
              {project.trouble.map(([title, body]) => (
                <p key={title}><strong>{title}</strong><br />{body}</p>
              ))}
            </div>
          </div>
          <div className="detail-block">
            <h4>정리</h4>
            <p>{project.result}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <nav>
        <div className="page">
          {navItems.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </div>
      </nav>

      <header id="home">
        <div className="page hero">
          <div>
            <p className="eyebrow">System Developer Portfolio</p>
            <h1>임찬혁</h1>
            <p className="hero-copy">
              백엔드와 시스템 레벨 구현을 함께 경험한 개발자입니다.
              Spring Boot 기반 서비스부터 C/C++ 소켓 통신, Raw Socket 네트워크 프로젝트까지
              동작 원리를 코드로 확인하며 문제를 해결하는 것을 좋아합니다.
            </p>
          </div>
          <div className="hero-panel">
            <div className="contact-list" aria-label="contact">
              <a className="contact-item" href="mailto:cfasd1875@gmail.com" aria-label="Email"><MailIcon /></a>
              <a className="contact-item" href="https://github.com/chanhk-im" aria-label="GitHub"><GithubIcon /></a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="about">
          <div className="page section-head">
            <h2>About</h2>
            <div>
              <p className="lead">
                기능 구현에서 끝내지 않고 성능 병목, 데이터 정합성, 운영 장애 추적까지 함께 고민합니다.
                CRAWeb에서는 백엔드, 배포, 모니터링을 구축했고 Point Cloud 프로젝트에서는 실시간 전송 지연을 600ms에서 130ms로 줄였습니다.
              </p>
            </div>
          </div>
        </section>

        <section id="strengths" className="compact-section">
          <div className="page section-head">
            <h2>핵심 역량</h2>
            <div className="grid three">
              <div className="card compact-card"><h3>서버/백엔드 구현</h3><p>Spring Boot, Security, JPA, MySQL 기반 REST API를 설계하고 인증, 게시글, 파일 처리 기능을 구현했습니다.</p></div>
              <div className="card compact-card"><h3>시스템 성능 개선</h3><p>C/C++ 소켓 통신에서 병렬 처리, 프레임 스킵, 다운샘플링을 적용해 실시간 전송 지연을 줄였습니다.</p></div>
              <div className="card compact-card"><h3>운영과 문제 추적</h3><p>Docker, GitHub Actions, AWS, Grafana, Loki, Prometheus로 배포와 장애 추적이 가능한 환경을 구성했습니다.</p></div>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="page section-head">
            <h2>프로젝트</h2>
            <div className="grid project-list">
              {projects.map((project) => (
                <ProjectCard project={project} key={project.id} onOpen={setSelectedProject} />
              ))}
            </div>
          </div>
        </section>

        <section id="cases">
          <div className="page section-head">
            <h2>문제 해결 사례</h2>
            <div className="case-study">
              <div className="case-row"><strong>실시간 전송 지연</strong><p>Point Cloud 데이터 전송량을 줄이고 병렬 처리와 다운샘플링을 적용해 600ms 지연을 130ms까지 낮췄습니다.</p></div>
              <div className="case-row"><strong>데이터 정합성</strong><p>CRAWeb 좋아요 구조를 중간 엔티티로 분리하고 Fetch Join, 유니크 제약을 적용해 중복 데이터와 조회 비용을 줄였습니다.</p></div>
              <div className="case-row"><strong>운영 장애 추적</strong><p>로그와 메트릭 수집 구조를 추가해 배포 이후 API 상태와 장애 원인을 확인할 수 있게 했습니다.</p></div>
              <div className="case-row"><strong>TCP 패킷 처리</strong><p>Raw Socket으로 IP/TCP 헤더, 체크섬, NAT 테이블을 직접 구현하며 네트워크 동작을 검증했습니다.</p></div>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="page section-head">
            <h2>기술 스택</h2>
            <div className="skill-table">
              {skills.map(([name, value]) => (
                <div className="skill-row" key={name}><strong>{name}</strong><span>{value}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="education">
          <div className="page section-head">
            <h2>교육 및 수상</h2>
            <div className="grid two">
              {education.map((entry) => (
                <div className="card" key={entry.id}>
                  <h3>{entry.title}</h3>
                  <p>{entry.period}</p>
                  <ul>
                    {entry.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="page">
          <p>chanhk-im</p>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

export default App;
