import { useState } from "react";
import { IconDashboardFilled } from "@tabler/icons-react";
import { Code, Group, Stack, Text } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "@/css/SideNavbar.module.css";

const data = [{ link: "", label: "Sales", icon: IconDashboardFilled }];

export function SideNavbarComponent() {
  const [active, setActive] = useState("Sales");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Stack
      h={{
        base: "100%",
        sm: "100vh",
        lg: "100vh",
      }}
      bg={"blue"}
      p={"md"}
      className="fixed"
    >
      <div className="h-full">
        <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} inverted style={{ color: "white" }} />
          <Code fw={700} className={classes.version}>
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>

      <Stack gap={0} align="center">
        <Text fw={"bolder"} size="xs" c={"white"}>
          Created by Zeffry Reynando
        </Text>
      </Stack>
    </Stack>
  );
}
