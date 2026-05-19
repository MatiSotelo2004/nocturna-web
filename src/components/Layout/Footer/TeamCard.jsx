const TeamCard = ({ nombre, rol, bio, iniciales }) => {
  return (
    <div className="rounded-lg text-center bg-secondary border border-gray-700 p-6 flex flex-col items-center">
      <div className="w-14 h-14 rounded-4xl border border-accent-primary bg-amber-800/15 items-center text-accent-primary justify-center flex mb-3.5">{iniciales}</div>
      <h4 className="text-text-primary">{nombre}</h4>
      <p className="text-accent-primary tracking-wide uppercase text-xs">{rol}</p>
      <p >{bio}</p>
    </div>
  );
};

export default TeamCard;