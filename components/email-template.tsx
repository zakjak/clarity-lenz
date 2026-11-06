import {
  Html,
  Head,
  Body,
  Container,
  Img,
  Text,
  Section,
  Row,
  Column,
  Hr,
  Link,
} from "@react-email/components";

type EmailTemplateProp = {
  title: string;
  description: string;
  time: string;
  date: string;
  duration: number;
  password: string;
  zoom_link: string;
  price: number;
};

const EmailTemplate = ({
  title,
  description,
  time,
  duration,
  date,
  password,
  zoom_link,
  price,
}: EmailTemplateProp) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f4f4f5", padding: "30px 0" }}>
        <Container
          style={{
            backgroundColor: "#0f172a",
            borderRadius: "16px",
            padding: "30px",
            color: "#e4e4e7",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Section style={{ textAlign: "center" }}>
            <Img
              src="https://claritylenz.com/images/logo_darkmode.png"
              width="120"
              alt="Clarity Lenz"
              style={{ margin: "0 auto" }}
            />

            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
              Your session has been successfully booked!
            </Text>

            <Text style={{ fontSize: "18px" }}>Price: ${price.toFixed(2)}</Text>
          </Section>

          <Hr style={{ borderColor: "#334155" }} />

          {[
            ["Title", title],
            ["Description", description],
            ["Time", `${time} (CDT)`],
            ["Duration", `${duration} minutes`],
            ["Date", date],
            ["Password", password],
          ].map(([label, value]) => (
            <Row key={label} style={{ marginBottom: "12px" }}>
              <Column style={{ width: "35%" }}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  {label}
                </Text>
              </Column>
              <Column>
                <Text style={{ color: "#d4d4d8" }}>{value}</Text>
              </Column>
            </Row>
          ))}

          <Section style={{ textAlign: "center", marginTop: "25px" }}>
            <Link
              href={zoom_link}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "14px 25px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Join Zoom Meeting
            </Link>
          </Section>

          <Text style={{ color: "#94a3b8", fontSize: "12px" }}>
            Zoom Password: {password}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
