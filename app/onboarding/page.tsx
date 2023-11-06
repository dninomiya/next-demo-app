import { currentUser } from '@/app/actions/user';
import PetForm from '@/app/onboarding/pet-form';
import UserForm from '@/app/onboarding/user-form';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await currentUser();

  if (user && user.pets.length > 0) {
    redirect('/main');
  }

  if (user) {
    return <PetForm />;
  } else {
    return <UserForm />;
  }
}
