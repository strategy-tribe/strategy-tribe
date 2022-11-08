import { useAuth } from 'auth/AuthContext';

export function LogOutButton({ hide }: { hide: () => void }) {
  const { LogOut } = useAuth();

  return (
    <button
      className="w-full py-4 pl-8 pr-4 text-right hover:bg-surface"
      onClick={() => {
        hide();
        LogOut();
        window.location.reload();
      }}
    >
      Log out
    </button>
  );
}
