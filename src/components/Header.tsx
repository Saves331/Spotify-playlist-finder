import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import type { ReactNode } from "react";

interface HeaderProps {
    children?: ReactNode;
}

function Header({ children }: HeaderProps) {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors ${
            isActive
                ? "bg-surface text-accent"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
        }`;

    return (
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4">
            <nav className="flex gap-2">
                <NavLink to="/" end className={linkClass}>
                    <FontAwesomeIcon icon={faHouse} />
                    <span className="hidden sm:inline">Home</span>
                </NavLink>
                <NavLink to="/search" className={linkClass}>
                    <FontAwesomeIcon icon={faRecordVinyl} />
                    <span className="hidden sm:inline">Albums</span>
                </NavLink>
            </nav>

            <div className="flex items-center gap-3 sm:gap-5">
                {children}
            </div>
        </header>
    )
}

export default Header