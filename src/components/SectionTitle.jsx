export default function SectionTitle({ icon: Icon, children }) {
  return (
    <h2 className="section-title">
      <span className="section-title-icon"><Icon size={22} /></span>
      {children}
    </h2>
  );
}
