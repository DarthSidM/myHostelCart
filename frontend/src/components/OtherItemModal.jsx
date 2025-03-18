"use client";

import { Phone, User } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export function OtherItemModal({ isOpen, onClose, item }) {
  if (!item) return null;
  const seller = item.seller || {}; // Ensure seller exists

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg">
        <DialogHeader>
          {/* <DialogTitle className="text-xl font-semibold">{item.itemName}</DialogTitle> */}
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Item Images */}
          <div>
            <img
              src={item.itemPictures?.[0] ? item.itemPictures[0] : "/placeholder.svg"}
              alt={item.itemName}
              className="w-full aspect-square object-cover rounded-lg border border-gray-200 shadow-sm"
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
              {item.itemPictures?.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image ? image : "/placeholder.svg"}
                  alt={`${item.itemName} ${index + 2}`}
                  className="w-full h-20 object-cover rounded-md border border-gray-200 shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{item.itemName}</h2>
              <p className="text-xl font-semibold text-green-600 mb-4">₹{item.itemPrice?.toLocaleString("en-IN")}</p>
              <p className="text-muted-foreground mb-6 whitespace-pre-line break-words">{item.itemDescription}</p>
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
            <Button className="w-full mt-4 bg-black text-white hover:bg-gray-800">Contact Seller</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
