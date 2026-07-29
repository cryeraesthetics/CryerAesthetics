import { auth } from "@/lib/auth";
import { hasActiveMembership } from "@/lib/access";
import QuizForm from "@/components/QuizForm";

export const metadata = {
  title: "Skin Analysis Scanner | Cryer Aesthetics",
};

export default async function QuizPage() {
  const session = await auth();

  return (
    <QuizForm
      isLoggedIn={Boolean(session)}
      isMember={hasActiveMembership(session)}
    />
  );
}
