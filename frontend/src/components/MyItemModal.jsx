"use client"

import { useState } from "react"
import { X, Trash2, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import getDecodedToken from "../lib/auth"
import api from "../middleware/interceptor"




//get user id from cookie
var userId = ""
try {
  userId = getDecodedToken().userId
}
catch (error) {
  console.error("Error getting user ID:", error)
}


export function MyItemModal({ isOpen, onClose, item, onUpdateItem, onDeleteItem }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletedImages, setDeletedImages] = useState([])
  const [newImages, setNewImages] = useState([])

  if (!item) return null

  const handleEdit = () => {
    setIsEditing(true)
    setEditedItem({
      itemName: item.itemName || "",
      itemDescription: item.itemDescription || "",
      itemPrice: item.itemPrice || 0,
      itemPictures: [...item.itemPictures] || [],
      _id: item._id,
    })
  }

  const handleSave = async () => {
    if (!editedItem) return

    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("itemId", item._id)
    formData.append("itemName", editedItem.itemName)
    formData.append("itemDescription", editedItem.itemDescription)
    formData.append("itemPrice", editedItem.itemPrice)

    // Append deleted images
    deletedImages.forEach((img) => formData.append("deletedImages[]", img))

    // Append new images
    newImages.forEach((file) => formData.append("updatedImages", file))

    try {
      const response = await api.patch("/user/update-item", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log("Updated item:", response.data.message);
      onUpdateItem(response.data.item)
      setIsEditing(false)
      setDeletedImages([])
      setNewImages([])
    } catch (error) {
      console.error("Error updating item:", error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedItem(null)
    setDeletedImages([])
    setNewImages([])
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    try {
      await api.delete("/user/delete-item", {
        data: { userId, itemId: item._id },
      });
  
      console.log("Item deleted:", item._id);
      
      // Immediately remove item from frontend state
      onDeleteItem(item._id);
      
      // Close modal
      onClose();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };
  

  const handleRemoveImage = (imgUrl) => {
    setDeletedImages([...deletedImages, imgUrl])
    setEditedItem({
      ...editedItem,
      itemPictures: editedItem.itemPictures.filter((img) => img !== imgUrl),
    })
  }

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files)
    setNewImages([...newImages, ...files])
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto bg-white">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Item" : item.itemName}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Image Section */}
            <div>
              {/* Main Image with Delete Button */}
              <div className="relative">
                <img
                  src={item.itemPictures[0] ? item.itemPictures[0] : "/placeholder.svg"}
                  alt={item.itemName}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                {isEditing && (
                  <button
                    onClick={() => handleRemoveImage(item.itemPictures[0])}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                {item.itemPictures.slice(1).map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image ? image : "/placeholder.svg"}
                      alt={`${item.itemName} ${index + 2}`}
                      className="w-full h-20 object-cover rounded-md"
                    />
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveImage(image)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Upload New Images */}
              {isEditing && (
                <div className="mt-4">
                  <label className="flex items-center space-x-2 cursor-pointer bg-gray-200 p-2 rounded-md">
                    <Plus className="w-5 h-5" />
                    <span>Add Images</span>
                    <input type="file" multiple onChange={handleAddImage} className="hidden" />
                  </label>

                  {/* Display New Image Previews */}
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {newImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`new-${index}`}
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <button
                          onClick={() => handleRemoveNewImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>


            {/* Item Details */}
            <div>
              {isEditing ? (
                <div className="space-y-4">
                  <Input value={editedItem?.itemName} onChange={(e) => setEditedItem({ ...editedItem, itemName: e.target.value })} />
                  <Textarea value={editedItem?.itemDescription} onChange={(e) => setEditedItem({ ...editedItem, itemDescription: e.target.value })} rows={5} />
                  <Input type="number" value={editedItem?.itemPrice} onChange={(e) => setEditedItem({ ...editedItem, itemPrice: parseFloat(e.target.value) })} />
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">{item.itemName}</h2>
                  <p className="text-xl font-semibold mb-4">₹{item.itemPrice?.toFixed(2)}</p>
                  <p className="text-muted-foreground mb-6">{item.itemDescription}</p>
                  <div className="flex space-x-2">
                    <Button className="bg-gray-800 text-white hover:bg-gray-700" onClick={handleEdit}>Edit Item</Button>
                    <Button className="bg-red-600 text-white hover:bg-red-700" onClick={handleDelete}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
