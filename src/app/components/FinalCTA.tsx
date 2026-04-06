import { useRef, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";
const web3formsEndpoint = "https://api.web3forms.com/submit";
const web3formsAccessKey = "9180f8ee-c044-4680-8284-2c4f31aab1f0";

export function FinalCTA() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const message = String(formData.get("message") || "").trim();

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    try {
      formData.set("access_key", web3formsAccessKey);
      formData.set("subject", "Nieuwe aanvraag via Verkeersschool Beckers");
      formData.set("from_name", "Verkeersschool Beckers website");
      formData.set("botcheck", "");
      formData.set("name", `${firstName} ${lastName}`.trim());
      formData.set("phone", phone);
      formData.set("city", city);
      formData.set("message", message || "Geen extra bericht ingevuld.");

      const response = await fetch(web3formsEndpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        setSubmitState({
          type: "error",
          message: "Er ging iets mis bij het verzenden. Probeer het opnieuw.",
        });
        return;
      }

      form.reset();
      setSubmitState({
        type: "success",
        message: "Bedankt, je aanvraag is succesvol verzonden. We nemen zo snel mogelijk contact met je op.",
      });
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      setSubmitState({
        type: "error",
        message: "Verzenden lukt nu niet. Controleer later opnieuw of neem telefonisch contact op.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="proefles"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #1956E3 0%, #1956E3 40%, #1956E3 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal>
          <h2
            className="text-3xl sm:text-4xl lg:text-[3rem] text-white mb-6 tracking-tight"
            style={{ fontFamily: heading, fontWeight: 800, lineHeight: 1.15 }}
          >
            Klaar om te beginnen met{" "}
            <span className="relative inline-block">
              <span className="text-[#FD9F26]">rijlessen</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#FD9F26]/30 rounded-full" />
            </span>
            ?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
            Plan vandaag nog een proefles en ontdek hoe fijn het is om te leren rijden bij Verkeersschool Beckers.
          </p>
        </ScrollReveal>

        {/* Lead form */}
        <ScrollReveal delay={200}>
          <div className="bg-white/8 backdrop-blur-md rounded-3xl p-8 sm:p-10 max-w-xl mx-auto mb-12 border border-white/10">
            <div className="mb-6 text-center">
              <h3 className="text-white" style={{ fontFamily: heading, fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.2 }}>
                Vraag je proefles aan
              </h3>
              <p className="mt-2 text-sm text-white/60" style={{ fontFamily: body, fontWeight: 400 }}>
                Vul je gegevens in en we nemen zo snel mogelijk contact met je op.
              </p>
            </div>

            {submitState.type !== "idle" && (
              <div
                className={`mb-6 rounded-2xl border px-4 py-3 text-left ${
                  submitState.type === "success"
                    ? "border-green-300/60 bg-green-500 text-white shadow-lg shadow-green-900/20"
                    : "border-red-400/30 bg-red-500/15 text-white"
                }`}
              >
                <p style={{ fontFamily: body, fontWeight: 600, fontSize: "0.95rem" }}>
                  {submitState.type === "success" ? "Aanvraag succesvol verzonden" : "Verzenden mislukt"}
                </p>
                <p className="mt-1 text-sm text-white/80" style={{ fontFamily: body }}>
                  {submitState.message}
                </p>
              </div>
            )}

            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Voornaam"
                  required
                  className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                  style={{ fontFamily: body }}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Achternaam"
                  required
                  className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                  style={{ fontFamily: body }}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mailadres"
                  required
                  className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                  style={{ fontFamily: body }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefoonnummer"
                  required
                  className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                  style={{ fontFamily: body }}
                />
              </div>
              <input
                type="text"
                name="city"
                placeholder="Woonplaats"
                className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                style={{ fontFamily: body }}
              />

              {/* Text area for message */}
              <textarea
                name="message"
                placeholder="Heb je een vraag of opmerking? Laat het hier weten (optioneel)"
                rows={3}
                className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-[1.75rem] text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300 resize-none"
                style={{ fontFamily: body }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#FD9F26] hover:brightness-90 text-white rounded-full transition-all duration-300 shadow-lg shadow-[#FD9F26]/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                style={{ fontFamily: body, fontWeight: 700 }}
              >
                {isSubmitting ? "Bezig met verzenden..." : "Proefles aanvragen"}
              </button>
            </form>
            <p className="text-white/30 text-xs mt-4" style={{ fontFamily: body }}>
              * De proefles kost € 60,- inclusief persoonlijk advies
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={350}>
            <p className="text-white/50 mb-5 text-sm" style={{ fontFamily: body, fontWeight: 500 }}>Of neem direct contact met ons op</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+31638687155"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/8 hover:bg-white/15 text-white rounded-full transition-all duration-300 border border-white/15 hover:border-white/25 hover:-translate-y-0.5"
              style={{ fontFamily: body, fontWeight: 500 }}
            >
              <Phone className="w-4 h-4" />
              Mitchell: 06 38 68 71 55
            </a>
            <a
              href="tel:+31634042048"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/8 hover:bg-white/15 text-white rounded-full transition-all duration-300 border border-white/15 hover:border-white/25 hover:-translate-y-0.5"
              style={{ fontFamily: body, fontWeight: 500 }}
            >
              <Phone className="w-4 h-4" />
              Rodney: 06 34 04 20 48
            </a>
          </div>
          <div className="flex justify-center mt-4">
            <a
              href="https://wa.me/31638687155"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:-translate-y-0.5"
              style={{ fontFamily: body, fontWeight: 500 }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp ons
            </a>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}
