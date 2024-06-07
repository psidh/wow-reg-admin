export default function Detail({ email }: { email: string }) {
  if (email) {
    return (
      <div>
        <div className="p-2 bg-neutral-800 rounded-xl shadow-2xl shadow-neutral-600">
          <h2>Email: {email}</h2>
        </div>
      </div>
    );
  } else {
    <div>Scan</div>;
  }
}
