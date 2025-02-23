import Header from "@/components/Header";
import { Avatar, AvatarImage } from "@/components/ui/avatar";


export default function Home() {
  return (
    <div>
      <Header />

      <div className="w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage 
              src="https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/478574169_9077837935604452_3537622823525496935_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHH5fRapQnAOHZWoQlq-5QJJy11jp23DSgnLXWOnbcNKHsgefMgUcRRxVPe5kWVq8phu1Dicm90KWfkbQEI43MU&_nc_ohc=EfvRQCs3HLAQ7kNvgEZWAnf&_nc_oc=AdjEovaIU6DK7yK3s1397dMONmMiU-5_nGAU3CqiXYSIJ3rxHkePrXBo-xEfa6cu9q8&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=ACnvfGZGoxns7Cn5AbhmxEW&oh=00_AYA3j-hTbXAM7sxqYkyBOH6lwU17ikjZxurCkSt8UZFi3Q&oe=67C06536" 
              width={1000}
            />
          </Avatar>
          <div className="grow">
            <h2 className="text-2xl font-bold sm:text-4xl">Hi, I&apos;m Pol Hidalgo </h2>
            <h5 className="mt-1 text-base font-semibold text-gray-900">Student Software Engineer</h5>
          </div>
        </div>
      </div>
    </div>
  )
}