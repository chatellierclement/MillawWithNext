import * as React from "react";
import Link from "next/link";
// import { getCookie } from "tiny-cookie";
import classnames from "classnames";
// import { ExpandedIcon } from "outline-icons";
import { spacing, colors } from "theme";
// import useOnClickOutside from "lib/hooks/useOnClickOutside";

const isBrowser = typeof document !== "undefined";
let isHydrating = true;

class MenuItem extends React.Component<{
  children: React.ReactNode;
  href?: string;
  onClick?: (event) => void;
  className?: string;
  target?: string;
  top?: boolean;
}> {
  render() {
    const { children, href, top, onClick, className } = this.props;

    return (
      <>
        <a href={href} onClick={onClick} className={className}>
          {children}
        </a>
        <style jsx>
          {`
            a {
              display: flex;
              align-items: center;
              padding: ${spacing.small} ${spacing.medium};
              color: rgba(0, 0, 0, 0.75);
              text-decoration: none;
              white-space: nowrap;
              border-radius: 4px;
              min-height: 40px;
              font-weight: 500;
              position: relative;
              user-select: none;
              overflow: hidden;
            }
            a.menu-with-icon {
              padding-right: 8px;
              position: relative;
              z-index: 3;
            }
            a.launch,
            a.highlighted,
            a:hover {
              background: ${top ? "rgba(0, 0, 0, 0.1)" : colors.primary};
              color: ${top ? colors.almostBlack : colors.white};
            }
            a.open,
            a.open:hover {
              background: none;
            }
            a.launch {
              width: 122px;
            }
          `}
        </style>
      </>
    );
  }
}

function Teams({ sessions }) {
  return (
    <>
      {Object.keys(sessions).map((teamId) => {
        const session = sessions[teamId];
        return (
          <li key={teamId}>
            <MenuItem href={session.url} className="session">
              <img className="teamLogo" src={session.logoUrl} />{" "}
              <span>{session.name}</span>
            </MenuItem>
          </li>
        );
      })}
      <style jsx>
        {`
          a.session {
            font-weight: 500;
          }
          .teamLogo {
            display: inline-block;
            margin-right: ${spacing.small};
            border: 1px solid ${colors.grey};
            border-radius: 4px;
            width: 32px;
            height: 32px;
          }
        `}
      </style>
    </>
  );
}

// function getSessions() {
//   if (isBrowser) {
//     return JSON.parse(getCookie("sessions") || "{}");
//   }
//   return {};
// }

export default function HeaderNavigation() {
  const ref = React.useRef();
  const [openNav, setOpenNav] = React.useState(null);
  const [sessions, setSessions] = React.useState(null);
  const isSignedIn = sessions ? Object.keys(sessions).length : false;

  // don't try and load the users active sessions during SSR, it ain't ever
  // gonna work ??? load sessions from cookies when they haven't already been
  // loaded on the client
//   if (isBrowser && !sessions) {
//     if (isHydrating) {
//       setTimeout(() => {
//         isHydrating = false;
//         setSessions(getSessions());
//       }, 0);
//     } else {
//       setSessions(getSessions());
//     }
//   }

//   useOnClickOutside(ref, () => setOpenNav(null));

  const setActiveNav = (name) => (event) => {
    event.preventDefault();
    setOpenNav(name);
  };

  return (
    <nav role="navigation" ref={ref}>
      <ul>      
        <li
          className={openNav === "sessions" ? "open" : "hidden-on-mobile"}
          key={isSignedIn ? "signed-in" : ""}
        >
          {isSignedIn ? (
            <>
              <MenuItem
                href="#login"
                className={classnames(
                  "launch",
                  "menu-with-icon",
                  openNav === "sessions" && "open"
                )}
                aria-haspopup="true"
                onClick={setActiveNav("sessions")}
                top
              >
                Ouvrir Millaw 
                {/* <ExpandedIcon color="currentColor" /> */}
              </MenuItem>
              <ul className="sessions">
                <Teams sessions={sessions} />
              </ul>
            </>
          ) : (
            <span className="auth">
              <MenuItem
                className="highlighted"
                href={`http://localhost:3000/login`}
                top
              > Se connecter
              </MenuItem>{" "}
            </span>
          )}
        </li>
      </ul>
      <style jsx>
        {`
          nav {
            display: flex;
            justify-content: flex-end;
          }
          ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          li {
            display: block;
            transition-duration: 0.5s;
            position: relative;
            margin: 0 0 0 ${spacing.medium};
          }
          li:hover {
            cursor: pointer;
          }
          ul li ul {
            visibility: hidden;
            opacity: 0;
            display: block;
            position: absolute;
            pointer-events: none;
            margin-top: 0;
            margin-left: ${spacing.medium};
            padding: 0 ${spacing.small} ${spacing.small};
            left: 0;
            background: rgba(255, 255, 255, 0.98);
            border-radius: 4px;
            min-width: 136px;
            z-index: 1;
          }
          @supports (
            (-webkit-backdrop-filter: blur(20px)) or
              (backdrop-filter: blur(20px))
          ) {
            ul li ul {
              background: rgba(255, 255, 255, 0.8);
              backdrop-filter: blur(20px);
            }
          }
          ul li ul.sessions {
            min-width: 160px;
            max-width: 260px;
          }
          ul li ul.mobile {
            z-index: 2;
            width: 55vw;
            min-width: 0;
            left: auto;
            right: 0;
          }
          h3 {
            margin-left: ${spacing.medium};
            margin-bottom: 0.5em;
          }
          ul li ul a:last-child {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          ul li.open > ul,
          ul li:focus-within > ul,
          ul li ul:hover,
          ul li ul:focus {
            visibility: visible;
            opacity: 1;
            display: block;
            transition: opacity 200ms ease-in-out;
            pointer-events: initial;
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05),
              0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08);
            padding-top: 42px;
            margin-top: -42px;
            margin-left: 0;
          }
          ul li ul li {
            clear: both;
            width: 100%;
            margin: 0;
          }
          li.hidden-on-desktop {
            display: none;
          }
          .auth {
            display: flex;
            align-items: center;
          }
          .or {
            padding: 0 4px;
          }
          @media (max-width: 48em) {
            li.hidden-on-desktop {
              display: block;
            }
            li.hidden-on-mobile {
              display: none;
            }
          }
        `}
      </style>
    </nav>
  );
}