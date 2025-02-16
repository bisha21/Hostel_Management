import Filter from "./_components/room/Filter";
import RoomList from "./_components/room/RoomList";


export default  function Room() {
  return (
   <div className="w-full bg-[#141c24] ">
     <div className=" max-w-7xl mx-auto  px-8 py-12">
      <h1 className="text-4xl mb-5 text-[#c69963] font-medium ">
        Our Luxury Room!
      </h1>
      <p className="text-slate-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature &apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
    </div>
    <Filter/>
    <RoomList/>
   </div>
  );
}
