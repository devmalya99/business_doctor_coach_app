"use client";

import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  BookOpenText,
  Award,
  Clock,
} from "lucide-react";
import { onboardprocess } from "@/actions/getavaliability";
import useFetch from "@/hooks/useFetch";
import { updateUsername } from "../../actions/user";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const timeSlots = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

const steps = [
  { number: 1, title: "Personal Info", icon: User },
  { number: 2, title: "Professional", icon: Briefcase },
  { number: 3, title: "Bio", icon: BookOpenText },
  { number: 4, title: "Availability", icon: Clock },
];

export default function Page() {
  const [step, setStep] = useState(1);
  const [erroring, seterroring] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      industry: "",
      experience: "",
      bio: "",
      timeGap: 0, // 🔹 default 30 minutes
      ...days.reduce((acc, day) => {
        acc[day] = {
          isAvailable: false,
          startTime: "09:00",
          endTime: "17:00",
        };
        return acc;
      }, {}),
    },
  });

  const prevStep = () => setStep((s) => s - 1);
  const nextStep = () => setStep((s) => s + 1);

  const checkUsername = async (username) => {
    try {
      const usernameUpdate = await updateUsername(username);
      console.log(usernameUpdate);
      // if (usernameUpdate.success) {
      //   // ✅ Navigate to dashboard
      //   router.push("/dashboard");
      // }
      return usernameUpdate;
    } catch (error) {
      console.log(error);
      seterroring(error);
    }
  };

  const handleNextStepOne = async () => {
    // validate username field
    const isValid = await trigger("username");
    if (!isValid) return;

    const { username } = getValues();
    const available = await checkUsername(username);

    if (!available) {
      // setError("username", {
      //   type: "manual",
      //   message: "Username already exists. Try another one.",
      // });
      return;
    }

    // ✅ only move to next step if username is valid & unique
    nextStep();
  };
  const usernameWatch = watch("username");
  useEffect(() => {
    if (erroring) {
      seterroring("");
    }
  }, [usernameWatch]);

  const { data, loading, error, fn: fnonboarded } = useFetch(onboardprocess);
  const onSubmit = async (datas) => {
    await fnonboarded(datas);
    if (data) {
      router.push("/dashboard");
    }
  };

  const StepIndicator = ({ currentStep }) => (
    <div className="flex items-center justify-center mb-12">
      {steps.map((stepInfo, index) => {
        const Icon = stepInfo.icon;
        const isActive = currentStep === stepInfo.number;
        const isCompleted = currentStep > stepInfo.number;

        return (
          <div key={stepInfo.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white border-black"
                    : isCompleted
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-400 border-gray-300"
                }`}
              >
                <Icon size={20} />
              </div>
              <span
                className={`text-sm mt-2 font-medium ${
                  isActive || isCompleted ? "text-black" : "text-gray-400"
                }`}
              >
                {stepInfo.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                  isCompleted ? "bg-black" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Professional Profile Setup
          </h1>
          <p className="text-gray-600">
            Complete your profile in a few simple steps
          </p>
        </div>

        <StepIndicator currentStep={step} />

        <div className="bg-white border-2 border-black rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                {/* username */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-black uppercase tracking-wider">
                    Username *
                  </label>
                  <input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-black placeholder-gray-500"
                  />
                  {erroring && (
                    <p className="text-red-500 text-sm">
                      username already taken
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={handleNextStepOne}
                    className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
                  >
                    Next Step
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                {/* industry + experience */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-black uppercase tracking-wider">
                      Industry *
                    </label>
                    <input
                      {...register("industry", {
                        required: "Industry is required",
                      })}
                      placeholder="e.g. Technology, Healthcare, Finance"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-black placeholder-gray-500"
                    />
                    {errors.industry && (
                      <p className="text-red-500 text-sm">
                        {errors.industry.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-black uppercase tracking-wider">
                      Experience *
                    </label>
                    <input
                      {...register("experience", {
                        required: "Experience is required",
                      })}
                      placeholder="e.g. 5 years, Senior level"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-black placeholder-gray-500"
                    />
                    {errors.experience && (
                      <p className="text-red-500 text-sm">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium flex items-center gap-2"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
                  >
                    Next Step
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Bio */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-black uppercase tracking-wider">
                    Tell us
                  </label>
                  <textarea
                    {...register("bio")}
                    placeholder="Describe your notable achievements, awards, certifications, or key project successes..."
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-black placeholder-gray-500 resize-vertical"
                  />
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium flex items-center gap-2"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
                  >
                    Next Step
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-black mb-2">
                    Availability Schedule
                  </h2>
                  <p className="text-gray-600">
                    Set your weekly availability hours
                  </p>
                </div>

                {/* 🔹 TimeGap input */}
                <div className="my-4">
                  <label className="block text-sm font-medium">
                    Time Gap (minutes)
                  </label>
                  <input
                    type="number"
                    {...register("timeGap", {
                      valueAsNumber: true,
                      min: 0,
                      max: 180,
                    })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter time gap"
                  />
                  {errors.timeGap && (
                    <p className="text-red-500 text-sm">
                      Please enter a valid number (5–180)
                    </p>
                  )}
                </div>

                {/* Days checkboxes + times */}
                <div className="space-y-4">
                  {days.map((day) => {
                    const isAvailable = watch(`${day}.isAvailable`);
                    return (
                      <div
                        key={day}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-4">
                          <Controller
                            name={`${day}.isAvailable`}
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked);
                                  if (!checked) {
                                    setValue(`${day}.startTime`, "09:00");
                                    setValue(`${day}.endTime`, "17:00");
                                  }
                                }}
                                className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                              />
                            )}
                          />

                          <div className="w-28">
                            <span className="text-black font-medium text-lg">
                              {day.charAt(0).toUpperCase() + day.slice(1)}
                            </span>
                          </div>

                          {isAvailable ? (
                            <div className="flex items-center gap-3 flex-1">
                              <Controller
                                name={`${day}.startTime`}
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger className="w-32 border-2 border-gray-300 focus:border-black">
                                      <SelectValue placeholder="Start" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />

                              <span className="text-gray-600 font-medium">
                                to
                              </span>

                              <Controller
                                name={`${day}.endTime`}
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger className="w-32 border-2 border-gray-300 focus:border-black">
                                      <SelectValue placeholder="End" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          ) : (
                            <div className="flex-1">
                              <span className="text-gray-400 italic">
                                Not available
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium flex items-center gap-2"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  {error && (
                    <div className="text-red-500 text-sm">{error?.message}</div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
                  >
                    {loading ? "Completing..." : "Complete Setup"}
                    <Award size={20} />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
