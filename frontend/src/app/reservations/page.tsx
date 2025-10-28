import UserReservations from "@/components/reservations/UserReservations";
import ProductVillaSection from "@/components/villa/ProductVillaSection";

export default function page() {
  return (
    <div>
      <UserReservations />
      <div className="max-w-9xl mx-auto px-10">
        <hr className="border-t-[2px] border-gray-300 my-8" />
      </div>
      <div className="max-w-9xl mx-auto px-10 mt-5">
        <ProductVillaSection/>
      </div>
    </div>
  )
}
