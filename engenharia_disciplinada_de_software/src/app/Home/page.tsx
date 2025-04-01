import Image from "next/image";
import { HomeDiv } from "./styles";

export default function Home() {
  
    return (
      <HomeDiv>
        <Image 
                src="/Home.svg" 
                alt="Building Illustration"
                width={600}
                height={600}
                style={{ width: "20%", height: "auto" }}
                priority
              />
      </HomeDiv>
    );
  }