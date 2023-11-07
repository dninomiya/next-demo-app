import { currentUser } from '@/app/actions/user';
import PetForm from '@/app/onboarding/pet-form';
import UserForm from '@/app/onboarding/user-form';

export default async function Page() {
  const user = await currentUser();

  if (user) {
    return <PetForm />;
  } else {
    return <UserForm />;
  }
}
