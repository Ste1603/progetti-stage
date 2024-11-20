export async function GET(request) {
  const provincia = request.nextUrl.searchParams.get("provincia");
  console.log(provincia);

  if (!provincia) {
    return new Response(
      JSON.stringify({ error: "Provincia non specificata" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const detailers = await prisma.user.findMany({
      where: {
        provincia: provincia,
        userType: "detailer",
      },

      include: {
        services: true,
      },
    });

    return new Response(JSON.stringify(detailers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Errore nel recuperare i detailer:", error);
    return new Response(
      JSON.stringify({ error: "Errore nel recuperare i detailer" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
