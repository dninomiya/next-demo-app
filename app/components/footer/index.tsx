import Image from 'next/image';
import avatar from './avatar.png';

export default function Footer() {
  return (
    <footer className="text-center mt-4 text-gray-500 py-4 px-6">
      <a
        href="https://twitter.com/d151005"
        target="_blank"
        className="inline-flex gap-2 items-center justify-center"
      >
        Created by
        <Image src={avatar} alt="" className="w-8 h-8 rounded-full" />
      </a>
    </footer>
  );
}
