import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Save } from "lucide-react";
import { submitDailyInput } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function DailyInputForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    focus_difficulty: 0,
    mental_exhaustion: 0,
    sleep_disruption: 0,
    workload: 0,
    emotional_friction: 0
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const mapWorkload = (value) => {
    if (value <= 3) return 0;
    if (value <= 7) return 1;
    return 2;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitDailyInput(formData);

    // Redirect to dashboard after submit
    navigate("/dashboard");
  };

  return (
    <div style={{
      background: "white",
      borderRadius: "20px",
      padding: "3rem",
      maxWidth: "800px",
      margin: "0 auto",
      boxShadow: "0 10px 25px -5px rgba(0,0,0,.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Daily Mental Health Check-In
      </h2>

      <form onSubmit={handleSubmit}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <FormGroup label="Sleep Disruption">
                <select
                  value={formData.sleep_disruption}
                  onChange={(e) => updateField("sleep_disruption", Number(e.target.value))}
                >
                  <option value={0}>No disruption</option>
                  <option value={1}>Somewhat disrupted</option>
                  <option value={2}>Severely disrupted</option>
                </select>
              </FormGroup>

              <FormGroup label="Workload / Pressure Today">
                <input
                  type="range"
                  min="1"
                  max="10"
                  onChange={(e) =>
                    updateField("workload", mapWorkload(Number(e.target.value)))
                  }
                />
              </FormGroup>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <FormGroup label="Focus Difficulty">
                <select
                  value={formData.focus_difficulty}
                  onChange={(e) => updateField("focus_difficulty", Number(e.target.value))}
                >
                  <option value={0}>No difficulty</option>
                  <option value={1}>Mild difficulty</option>
                  <option value={2}>Severe difficulty</option>
                </select>
              </FormGroup>

              <FormGroup label="Mental Exhaustion">
                <div style={{ display: "flex", gap: "10px" }}>
                  {[0, 1, 2].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => updateField("mental_exhaustion", v)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        border: "1px solid #ddd",
                        background: formData.mental_exhaustion === v ? "#6366f1" : "white",
                        color: formData.mental_exhaustion === v ? "white" : "#333"
                      }}
                    >
                      {["Low", "Medium", "High"][v]}
                    </button>
                  ))}
                </div>
              </FormGroup>

              <FormGroup label="Emotional Friction">
                <select
                  value={formData.emotional_friction}
                  onChange={(e) => updateField("emotional_friction", Number(e.target.value))}
                >
                  <option value={0}>Calm / Stable</option>
                  <option value={1}>Occasional irritation</option>
                  <option value={2}>Frequent emotional strain</option>
                </select>
              </FormGroup>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={{ textAlign: "center" }}>
              <Save size={48} />
              <p>Ready to submit your daily check-in?</p>
            </div>
          )}
        </motion.div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              <ChevronLeft /> Back
            </button>
          )}

          {step < 3 ? (
            <button type="button" onClick={nextStep}>
              Next <ChevronRight />
            </button>
          ) : (
            <button type="submit">
              Submit <Check />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={{ fontWeight: 600 }}>{label}</label>
      <div>{children}</div>
    </div>
  );
}
