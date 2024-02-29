import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex items-center justify-center bg-background h-[90vh]">
          <div className="relative items-center w-full px-5 mx-auto lg:px-16 max-w-7xl md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              {/* <p>hello</p> */}
              <div className="">
                  <h1 className="m-2">Lets check out the table</h1>
                  <Button>
                      <Link href={'/inventory'}>To The Inventory</Link>
                  </Button>
              </div>
          </div>
        </div>
      </section>
    </>
    
  );
}
