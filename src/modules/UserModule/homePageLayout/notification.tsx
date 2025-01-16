import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function Notification() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen">
      Huhu
    </section>
  );
}
