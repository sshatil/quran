import Link from "next/link";

import { cn } from "@/lib/utils";
import LoginForm from "@/components/auth/loginForm";

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// };

const Login = () => {
  return (
    <>
      <div className="container flex justify-center items-center md:gap-4 h-[calc(100vh-3.5rem)]">
        <div className="hidden md:block w-1/2 space-y-2">
          {/*TODO: random verse */}
          <p className="text-xl font-direction">
            ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا
            تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ
            وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا
            بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ
            وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ
            وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ
            حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ ٢٥٥
          </p>
          <blockquote className="space-y-2">
            <p className="text-sm">
              &ldquo;Allah! There is no god ˹worthy of worship˺ except Him, the
              Ever-Living, All-Sustaining. Neither drowsiness nor sleep
              overtakes Him. To Him belongs whatever is in the heavens and
              whatever is on the earth. Who could possibly intercede with Him
              without His permission? He ˹fully˺ knows what is ahead of them and
              what is behind them, but no one can grasp any of His
              knowledge—except what He wills ˹to reveal˺. His Seat1 encompasses
              the heavens and the earth, and the preservation of both does not
              tire Him. For He is the Most High, the Greatest.&rdquo;
            </p>
          </blockquote>
        </div>
        {/* form */}
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
