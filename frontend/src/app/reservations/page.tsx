import ProductSection from "@/components/Homepage/ProductSection";
import UserReservations from "@/components/reservations/UserReservations";
import ProductVillaSection from "@/components/villa/ProductVillaSection";

export default function page() {
  return (
    <div>
      <UserReservations />

      <ProductSection />
    </div>
  )
}
