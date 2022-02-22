// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../prisma/lib/prisma";

export default async function event(req, res) {
  switch (req.method) {
    case "GET":
      let eventFind = null;
      if (req.query.user_id) {
        eventFind = await prisma.event.findMany({
          include: { user: true },
          where: {
            AND: [{ user_id: +req.query.user_id }],
          },
          include: {
            planning: {
              include: {
                Permanence: true,
              },
            }
          }
        });
      } else if (req.query.date && req.query.permanence_id) {
        var parts = req.query.date.split("/");
        var today = new Date(
          parseInt(parts[2], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[0], 10)
        );

        eventFind = await prisma.event.findMany({
          where: {
            AND: [
              {
                date: {
                  gte: new Date(today.getFullYear(), today.getMonth(), 1),
                  lt: new Date(today.getFullYear(), today.getMonth() + 1, 0),
                },
              },
              { permanence_id: +req.query.permanence_id },
            ],
          },
        });
      } else if (req.query.planning_id) {
        eventFind = await prisma.event.findMany({
          include: { user: true, planning: true },
          where: {
            planning_id: req.query.planning_id,
          },
        });
      }
      res.status(200).json(eventFind);
      break;
    case "POST":
      let eventCreate = await prisma.event.create({
        data: req.body,
      });
      res.status(200).json(eventCreate);
      break;
    case "PUT":
      let eventPatch = await prisma.event.update({
        where: {
          id: req.body.id,
        },
        data: req.body,
      });
      res.status(200).json(eventPatch);
      break;
    case "DELETE":
      let eventDelete = await prisma.event.delete({
        where: {
          id: req.body.id,
        },
      });
      res.status(200).json(eventDelete);
      break;
  }
}
