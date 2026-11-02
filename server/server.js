
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

app.get("/", (req, res) => {
  res.json({ message: "Olympic Motel booking API is running." });
});

app.post("/api/bookings", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        message: "The database is not configured yet."
      });
    }

    const { checkIn, checkOut, guests, room, name, email } = req.body;

    if (!checkIn || !checkOut || !guests || !name || !email) {
      return res.status(400).json({
        message: "Please complete all required booking fields."
      });
    }

    const arrival = new Date(checkIn);
    const departure = new Date(checkOut);

    if (
      Number.isNaN(arrival.getTime()) ||
      Number.isNaN(departure.getTime()) ||
      departure <= arrival
    ) {
      return res.status(400).json({
        message: "Check-out must be later than check-in."
      });
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([{
        check_in: checkIn,
        check_out: checkOut,
        guests: String(guests),
        room_preference: room || "Any available room",
        guest_name: name.trim(),
        email: email.trim().toLowerCase(),
        status: "pending"
      }])
      .select()
      .single();

    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({
        message: "We could not save your enquiry. Please try again."
      });
    }

    return res.status(201).json({
      message: "Booking enquiry received.",
      booking: data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An unexpected server error occurred."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Olympic Motel backend running at http://localhost:${PORT}`);
});
