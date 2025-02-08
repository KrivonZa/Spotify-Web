import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import UpdateNA from "../../../components/ProfieComponent/updateNA";
import { AppDispatch } from "../../../stores";
import { useDispatch } from "react-redux";
import { userInfoThunk } from "../../../stores/userManager/thunk";
import { getPlaylistDetailThunk } from "../../../stores/playlistManager/thunk"
import { useUser } from "../../../hooks/useUser";
import { motion } from "framer-motion";

export function YourMusic() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen">
      
    </section>
  );
}
