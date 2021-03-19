import { Button } from "./Button";
import { useApp } from "../AppContext";

export function SideBar() {

  const { genres, handleClickButton, selectedGenre } = useApp();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container" >
        {genres.map(genre => (
          <Button
            key={Math.random()}
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}