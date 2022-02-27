import * as React from "react";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useTranslation from "next-translate/useTranslation";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const Contact: React.FC = () => {
  const { t } = useTranslation("contact");

  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const contactSchema = React.useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t("validation.name")),
        email: yup
          .string()
          .email(t("validation.emailFormat"))
          .required(t("validation.email")),
        message: yup.string().required(t("validation.message")),
      }),
    [t]
  );

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(contactSchema),
  });

  const onSend = React.useCallback(async (data) => {
    setIsSubmitting(true);
    emailjs
      .send(
        "default_service",
        process.env.EMAILJS_TEMPLATE_ID ?? "",
        { ...data, "g-recaptcha-response": recaptchaRef.current?.getValue() },
        process.env.EMAILJS_USERID
      )
      .then(
        () => {
          setErrorMessage("");
          setIsSubmitted(true);
        },
        () => {
          setErrorMessage("Something went wrong. Please try again later.");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  return (
    <div id="contact" className="w-full h-auto flex justify-center py-20">
      <div className="w-full md:w-[85vw] max-w-[100rem] flex flex-col items-center py-10 px-10 md:px-0">
        <div className="text-5xl font-bold text-slate-500 dark:text-white text-center pb-10">
          {t("title")}
        </div>
        {errorMessage ? (
          <div className="p-4 rounded-lg bg-red-400 w-full my-4 text-white flex flex-row justify-between">
            <div className="flex flex-row space-x-4">
              <span className="material-icons text-white">error</span>
              <span>{errorMessage}</span>
            </div>
            <span
              className="material-icons cursor-pointer"
              onClick={() => setErrorMessage("")}
            >
              close
            </span>
          </div>
        ) : null}
        <form
          className="flex flex-col space-y-8 w-full h-full"
          onSubmit={handleSubmit(onSend)}
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 justify-between w-full">
            <input
              className={cn("p-4 border rounded-lg basis-1/2", {
                "border-red-400": !!errors.name,
              })}
              placeholder="Name"
              {...register("name")}
            />
            <input
              className={cn("p-4 border rounded-lg basis-1/2", {
                "border-red-400": !!errors.email,
              })}
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <textarea
            className={cn("p-4 border rounded-lg", {
              "border-red-400": !!errors.message,
            })}
            rows={10}
            placeholder="Message"
            {...register("message")}
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            className="flex justify-center"
            size="normal"
            sitekey={process.env.RECAPTCHA_SITE_KEY ?? ""}
          />
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={cn(
              "py-4 bg-orange-500 rounded-lg text-white disabled:bg-orange-100",
              {
                "cursor-not-allowed": !isValid,
              }
            )}
          >
            {t("send")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
