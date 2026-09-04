import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useAuth } from "../context/AuthContext"



function Profile() {

      function handleLogout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.reload();
    }


    const { userProfile } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    if (userProfile === null) {
      return null;
    }


  return (
                              <div className="relative flex items-center">
                                  <button 
                                      className="cursor-pointer rounded-full ring-2 ring-transparent hover:ring-accent transition-all"
                                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                  >
                                      <img 
                                          className="rounded-full object-cover w-12 h-12" 
                                          src={userProfile.images[1].url} 
                                          alt={userProfile.display_name}
                                      />
                                  </button>

                                  {isDropdownOpen ? (
                                     <ul className="absolute top-full mt-2 right-0 w-48 rounded-lg bg-surface border border-white/10 shadow-lg py-2 text-text-primary z-10">
                                          <li>
                                              <a href={userProfile.external_urls.spotify} target="_blank" className="w-full text-left px-4 py-2.5 hover:bg-surface-hover transition-colors cursor-pointer flex items-center gap-2">
                                                  <FontAwesomeIcon icon={faUser} className="text-text-secondary" />
                                                  Spotify Profile
                                              </a>
                                          </li>
                                          <li>
                                              <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 hover:bg-surface-hover transition-colors cursor-pointer flex items-center gap-2 text-red-400">
                                                  <FontAwesomeIcon icon={faRightFromBracket} />
                                                  Logout
                                              </button>
                                          </li>
                                      </ul>
                                  ) : null}
                              </div>
  )
}

export default Profile