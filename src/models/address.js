import mongoose from "mongoose";

const NewAddressSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: String,
    address: String,
    contact: String,
    city: String,
    country: String,
    postalCode: String,
    location: String,
  },
  { timestamps: true }
);

const Address =
  mongoose.models.Address || mongoose.model("Address", NewAddressSchema);

export default Address;
