"use client";

import { Phone, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function OtherItemModal({ isOpen, onClose, item }) {
  if (!item) return null;
  const seller = item.seller || {};
  const images = item.itemPictures?.length ? item.itemPictures : ["/placeholder.svg"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg">
        <DialogHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Item Image Carousel */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".custom-next", // Left button moves forward
                prevEl: ".custom-prev", // Right button moves backward
              }}
              className="w-full rounded-lg border border-gray-200 shadow-sm"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Reversed Navigation Arrows */}
            <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-white/30 text-black p-3 rounded-full shadow-md hover:bg-white/50 transition-all">
              <ChevronLeft className="w-7 h-7 text-gray-900" />
            </button>
            <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-white/30 text-black p-3 rounded-full shadow-md hover:bg-white/50 transition-all">
              <ChevronRight className="w-7 h-7 text-gray-900" />
            </button>
          </div>

          {/* Item Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{item.itemName}</h2>
              <p className="text-xl font-semibold text-green-600 mb-4">
                ₹{item.itemPrice?.toLocaleString("en-IN")}
              </p>
              <p className="text-muted-foreground mb-6 whitespace-pre-line break-words">
                {item.itemDescription}
              </p>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h3 className="font-semibold mb-2 text-gray-700">Seller Information</h3>
              <div className="space-y-2 text-gray-800">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{seller?.fullName || "Unknown Seller"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{seller?.phoneNumber || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Contact Seller Button */}
            <Button className="w-full mt-4 bg-black text-white hover:bg-gray-800">
              Contact Seller
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
