import { test, expect } from "@playwright/test";

import { PollingUtil } from "@common/utils/PollingUtil";
import { FrameworkError } from "@common/errors/FrameworkError";

test.describe("PollingUtil", () => {

    test("should stop polling when the condition becomes true", async () => {

        let attempts = 0;

        await PollingUtil.waitUntil(
            async () => {

                attempts++;

                return attempts >= 3;
            },
            {
                timeoutMs: 5000,
                intervalMs: 100,
                operationName: "Condition becomes true"
            }
        );

        expect(attempts).toBe(3);
    });

    test("should throw FrameworkError when polling times out", async () => {

        await expect(
            PollingUtil.waitUntil(
                async () => false,
                {
                    timeoutMs: 300,
                    intervalMs: 100,
                    operationName: "Timeout condition"
                }
            )
        ).rejects.toThrow(FrameworkError);
    });

    test("should continue polling after a temporary condition error", async () => {

        let attempts = 0;

        await PollingUtil.waitUntil(
            async () => {

                attempts++;

                if (attempts === 1) {
                    throw new Error("Temporary lookup failure");
                }

                return attempts >= 3;
            },
            {
                timeoutMs: 5000,
                intervalMs: 100,
                operationName: "Temporary failure recovery"
            }
        );

        expect(attempts).toBe(3);
    });
});