import QrGenerator from "@/components/custom/qr-code/qr-generator";

export default function QRCodeGenerator() {
  return (
      <QrGenerator type="phone" initialValue="+1 "></QrGenerator>
  );
}
