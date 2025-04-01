import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "@/components/ui/BackButton";
import * as Sentry from "@sentry/nextjs";
export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      console.log(customer);
    } else {
      // new customer form component
    }
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      Sentry.captureException(err);
      throw err;
    }
  }
}
