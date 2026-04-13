import {
  Body,
  Heading,
  Html,
  Img,
  Button,
  Link,
  Text,
  Hr,
  Section,
} from "@react-email/components";
import { render } from "@react-email/render";
import moment from "moment";

type EmailProp = {
  title: string;
  description: string;
  formattedStart: Date;
  formattedEnd: Date;
  zoom_link: string;
  image_url: string;
  meeting_id: string;
  password: string;
  platform: string;
};

export function EventEmail({
  title,
  description,
  formattedStart,
  formattedEnd,
  zoom_link,
  image_url,
  meeting_id,
  password,
  platform,
}: EmailProp) {
  const eventDate = moment(formattedEnd).format("YYYY-MM-DD");
  const startEvent = moment(formattedStart).format("h:mm");
  const endEvent = moment(formattedEnd).format("h:mm");
  const start = moment(formattedStart);
  const end = moment(formattedEnd);
  const duration = moment.duration(end.diff(start));
  const formattedDuration = `${duration.hours()}h:${duration.minutes()}m`;
  return (
    <Html>
      <Body>
        <Img style={{ borderRadius: "20px" }} src={image_url} />
        <Text style={{ backgroundColor: "#262478", color: "white" }}>
          Online Event
        </Text>
        <Heading as="h1">{title}</Heading>
        <Text>
          Platform:{" "}
          <Text
            style={{
              backgroundColor: "#262478",
              padding: "10px",
              fontWeight: "bold",
              color: "white",
              fontSize: "20px",
            }}
          >
            {platform} meeting
          </Text>{" "}
        </Text>

        <Hr
          style={{
            borderColor: "#2e2e3e",
            margin: "24px 0",
            width: "100%",
            borderWidth: "2px",
          }}
        />

        <Heading as="h2">About This Event: </Heading>
        <Text>{description}</Text>

        <Heading as="h2">Date:</Heading>
        <Text>{eventDate}</Text>

        <Heading as="h2">Starts At:</Heading>
        <Text>{startEvent}</Text>

        <Heading as="h2">Ends At</Heading>
        <Text>{endEvent}</Text>

        <Heading as="h2">Duration: </Heading>
        <Text>{formattedDuration}</Text>

        <Hr
          style={{
            borderColor: "#2e2e3e",
            margin: "24px 0",
            width: "100%",
            borderWidth: "2px",
          }}
        />

        {(meeting_id || password) && (
          <Section>
            <Heading as="h1">Meeting Details:</Heading>

            <Heading as="h2">Meeting Id: </Heading>
            <Text>{meeting_id}</Text>

            <Heading as="h2">Password: </Heading>
            <Text>{password}</Text>
          </Section>
        )}

        <Section
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "25px" }}
        >
          <Text>OR</Text>
        </Section>

        <Button style={{ fontWeight: "bold", fontSize: "20px" }}>
          <Link href={zoom_link}>Click to join meeting</Link>
        </Button>

        <Hr
          style={{
            borderColor: "#2e2e3e",
            margin: "24px 0",
            width: "100%",
            borderWidth: "2px",
          }}
        />

        <Section
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text>We look forward to seeing you there</Text>
          <Text>The Clarity Lenz Team</Text>
          <Img
            src="https://imagedelivery.net/V3EJJMrlpSEedLe7fP6bSw/3014d09f-10cb-4e9c-89b1-bf8a3505d000/public"
            style={{ width: "100px", height: "100px" }}
          />
        </Section>
      </Body>
    </Html>
  );
}

export const htmlEmail = ({
  title,
  description,
  zoom_link,
  image_url,
  formattedEnd,
  formattedStart,
  password,
  meeting_id,
  platform,
}: EmailProp) => {
  return render(
    <EventEmail
      title={title}
      description={description}
      zoom_link={zoom_link}
      image_url={image_url}
      formattedEnd={formattedEnd}
      formattedStart={formattedStart}
      password={password}
      meeting_id={meeting_id}
      platform={platform}
    />,
  );
};
