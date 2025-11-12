// // import { NavLink } from "react-router-dom";
// // import "bootstrap-icons/font/bootstrap-icons.css";
// // import "../index.css";

// // export default function Sidebar() {
// //   return (
// //     <div className="sidebar p-3 bg-white">
// //       {/* Header */}
// //       <div className="d-flex align-items-center mb-4 border-bottom pb-3">
// //         <i className="bi bi-buildings-fill text-primary fs-3 me-2"></i>
// //         <h5 className="fw-bold mb-0">VZNX Workspace</h5>
// //       </div>

// //       {/* Navigation */}
// //       <div className="list-group">
// //         <NavLink
// //           to="/"
// //           end
// //           className={({ isActive }) =>
// //             `list-group-item list-group-item-action d-flex align-items-center ${
// //               isActive ? "active" : ""
// //             }`
// //           }
// //         >
// //           <i className="bi bi-speedometer2 me-2"></i>
// //            Dashboard
// //         </NavLink>
// //         <NavLink
// //           to="/projects"
// //           end
// //           className={({ isActive }) =>
// //             `list-group-item list-group-item-action d-flex align-items-center ${
// //               isActive ? "active" : ""
// //             }`
// //           }
// //         >
// //         <i className="bi bi-folder me-2"></i>
// //           Projects
// //         </NavLink>

// //         <NavLink
// //           to="/team-overview"
// //           className={({ isActive }) =>
// //             `list-group-item list-group-item-action d-flex align-items-center ${
// //               isActive ? "active" : ""
// //             }`
// //           }
// //         >
// //           <i className="bi bi-people-fill me-2"></i>
// //           Team 
// //         </NavLink>
// //       </div>
// //     </div>
// //   );
// // }

// import { NavLink } from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "../index.css";

// export default function Sidebar() {
//   return (
//     <div className="sidebar p-3 bg-white">
//       {/* Header */}
//       <div className="d-flex align-items-center mb-4 border-bottom pb-3">
//         <i className="bi bi-buildings-fill text-primary fs-3 me-2"></i>
//         <h5 className="fw-bold mb-0">VZNX Workspace</h5>
//       </div>

//       {/* Navigation */}
//       <div className="list-group">
//         <NavLink
//           to="/"
//           end
//           className={({ isActive }) =>
//             `list-group-item list-group-item-action d-flex align-items-center sidebar-item dashboard-tab ${
//               isActive ? "active" : ""
//             }`
//           }
//         >
//           <i className="bi bi-speedometer2 me-2"></i>
//           Dashboard
//         </NavLink>
//         <NavLink
//           to="/projects"
//           end
//           className={({ isActive }) =>
//             `list-group-item list-group-item-action d-flex align-items-center sidebar-item projects-tab ${
//               isActive ? "active" : ""
//             }`
//           }
//         >
//           <i className="bi bi-folder me-2"></i>
//           Projects
//         </NavLink>

//         <NavLink
//           to="/team-overview"
//           className={({ isActive }) =>
//             `list-group-item list-group-item-action d-flex align-items-center sidebar-item teams-tab ${
//               isActive ? "active" : ""
//             }`
//           }
//         >
//           <i className="bi bi-people-fill me-2"></i>
//           Team
//         </NavLink>
//       </div>
//     </div>
//   );
// }

import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../index.css";

export default function Sidebar() {
  return (
    <div className="sidebar p-3 bg-white">
      {/* Header */}
      <div className="d-flex align-items-center mb-4 border-bottom pb-3">
        <i className="bi bi-buildings-fill text-primary fs-3 me-2"></i>
        <h5 className="fw-bold mb-0">VZNX Workspace</h5>
      </div>

      {/* Navigation */}
      <div className="list-group">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center sidebar-item dashboard-tab ${
              isActive ? "active" : ""
            }`
          }
        >
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          end
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center sidebar-item projects-tab ${
              isActive ? "active" : ""
            }`
          }
        >
          <i className="bi bi-folder me-2"></i>
          Projects
        </NavLink>

        <NavLink
          to="/team-overview"
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center sidebar-item team-tab ${
              isActive ? "active" : ""
            }`
          }
        >
          <i className="bi bi-people-fill me-2"></i>
          Team
        </NavLink>
      </div>
    </div>
  );
}
