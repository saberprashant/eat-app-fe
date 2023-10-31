import React from "react";
import "./RestaurantView.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect } from "react";

interface Props {
  restaurant: { id: string; type: string; attributes: any };
  slots: {
    id: string;
    type: string;
    attributes: { available: boolean; label: string };
  }[];
  fetchSlots: (e) => void;
}

const RestaurantView = ({ restaurant, slots, fetchSlots }: Props) => {
  const maxPax = 50;

  let paxArray: number[] = [];
  for (let i = 1; i < maxPax; i++) {
    paxArray.push(i + 1);
  }

  const [openings, setOpenings] = useState([]);
  const [form, setForm] = useState({
    pax: 2, //default
    date: "",
    time: "",
  });

  useEffect(() => {
    if (form.date && form.time) {
      setOpenings(restaurant.attributes.openings[form.date]);
    } else if (!form.date && !form.time && restaurant?.attributes) {
      const firstDateKey = Object.keys(restaurant.attributes.openings)[0];
      setForm({
        ...form,
        date: firstDateKey,
        time: restaurant.attributes.openings[firstDateKey][0],
      });
    }
  }, [form, restaurant]);

  return (
    <>
      <div className="restaurant-card">
        <h1 className="restaurant-name">{restaurant.attributes?.name}</h1>
        <p className="address">{restaurant.attributes?.address_line_1}</p>
        <form className="form">
          <select
            name="pax"
            id="pax"
            onChange={(e) => {
              setForm({ ...form, pax: Number(e.target.value) });
            }}
          >
            {paxArray.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            name="date"
            id="date"
            onChange={(e) => {
              setForm({ ...form, date: e.target.value });
            }}
          >
            {restaurant?.attributes && (
              <>
                {Object.keys(restaurant?.attributes?.openings).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </>
            )}
          </select>

          <select
            name="time"
            id="time"
            onChange={(e) => {
              setForm({ ...form, time: e.target.value });
            }}
          >
            {openings.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <Button onClick={() => fetchSlots(form)}>Search</Button>
        </form>

        {slots?.length ? (
          <>
            <div className="slots-section">
              <div>Available openings, please select a time to reserve</div>
              <div className="slots">
                {slots.map((slot) => (
                  <div className="slot">{slot.attributes.label}</div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default RestaurantView;
