interface TeamCardProps {
  nombre: string;
  rol: string;
  bio: string;
  iniciales: string;
}

const TeamCard = ({ nombre, rol, bio, iniciales }: TeamCardProps) => {
  return (
    <div
      className="card text-center bg-secondary p-4 h-100 d-flex flex-column align-items-center"
      style={{ border: "1px solid rgba(155, 151, 168, 0.15)" }}
    >
      <div
        className="d-flex align-items-center justify-content-center mb-3"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "1px solid var(--accent-gold)",
          backgroundColor: "rgba(201, 168, 76, 0.15)",
          color: "var(--accent-gold)",
          fontWeight: "bold",
        }}
      >
        {iniciales}
      </div>
      <h4 className="text-light mb-1 h5">{nombre}</h4>
      <p
        className="text-accent-primary text-uppercase mb-3 fw-semibold"
        style={{ fontSize: "0.75rem", letterSpacing: "1.5px" }}
      >
        {rol}
      </p>
      <p
        className="text-text-secondary mb-0 text-sm"
        style={{ fontSize: "0.85rem" }}
      >
        {bio}
      </p>
    </div>
  );
};

export default TeamCard;
