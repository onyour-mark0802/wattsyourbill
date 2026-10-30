export async function handler(event, context) {
  const BLYNK_TOKEN = process.env.BLYNK_TOKEN;
  const BLYNK_HOST = process.env.BLYNK_HOST || 'sgp1.blynk.cloud';

  try {
    // Fetch V0 (Voltage), V1 (Current), V2 (Power), and V3 (Energy kWh) from Blynk
    const response = await fetch(
      `https://${BLYNK_HOST}/external/api/get?token=${BLYNK_TOKEN}&v0&v1&v2&v3`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from Blynk: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: 1,             // Matches AppContext check (!d.ok)
        v: data.v0,        // Voltage
        i: data.v1,        // Current
        p: data.v2,        // Power
        t: data.v3         // Total Energy (kWh) passed into track()
      }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: 0, error: error.message }),
    };
  }
}