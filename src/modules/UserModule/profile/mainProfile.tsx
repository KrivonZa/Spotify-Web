import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function MainProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen">
      Hihi
    </section>
  );
}
