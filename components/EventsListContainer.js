import { Grid } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import EventSummaryCard from "./EventSummaryCard";

const EventsListContainer = ({ events, isHosting }) => (
  <Grid container spacing={2}>
    {events.map((event) => (
      <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
        <Link href={`/events/${event._id}`} passHref>
          <EventSummaryCard event={event} isHosting={isHosting} />
        </Link>
      </Grid>
    ))}
  </Grid>
);

export default EventsListContainer;