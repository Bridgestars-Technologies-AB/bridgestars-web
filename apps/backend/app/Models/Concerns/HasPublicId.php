<?php

declare(strict_types=1);

namespace App\Models\Concerns;

use Hidehalo\Nanoid\Client;
use Exception;

/**
 * @property string $public_id
 */
trait HasPublicId
{
    public const PUBLIC_ID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

    public const PUBLIC_ID_LENGTH = 12;

    public const MAX_RETRIES = 10;

    public static function publicIdRegex(): string
    {
        return sprintf('[%s]{%d}', self::PUBLIC_ID_ALPHABET, self::PUBLIC_ID_LENGTH);
    }

    public static function bootHasPublicId(): void
    {
        static::creating(function (self $model): void {
            $model->setPublicId();
        });
    }

    public static function generatePublicId(): string
    {
        $client = new Client;

        return $client->formattedId(self::PUBLIC_ID_ALPHABET, self::PUBLIC_ID_LENGTH);
    }

    public function getRouteKeyName(): string
    {
        return 'public_id';
    }

    private function setPublicId(): void
    {
        if (isset($this->public_id)) {
            return;
        }

        $retries = 0;
        do {
            $this->public_id = self::generatePublicId();
            $retries++;
        } while (self::where('public_id', $this->public_id)->exists() && $retries < self::MAX_RETRIES);

        if ($retries === self::MAX_RETRIES) {
            throw new Exception("Failed to generate a unique public id after {$retries} attempts");
        }
    }
}
