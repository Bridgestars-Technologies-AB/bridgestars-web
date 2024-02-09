<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(public string $url){}

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Återställ ditt lösenord')
            ->greeting('Hej' . ' '  . $notifiable->name . ',')
            ->line('Du får detta e-postmeddelande eftersom vi mottog en lösenordsåterställningsbegäran för ditt konto.')
            ->action('Ange nytt lösenord', $this->url)
            ->line('Länken kommer att sluta gälla om '. Config::get('auth.verification.expire', 60) . ' minuter.')
            ->line('Om du inte begärde en lösenordsåterställning behöver du inte vidta några åtgärder.')
            ->line('Om du har några frågor kan du kontakta oss genom att svara på detta e-postmeddelande.')
            ->replyTo(config('mail.from.address'), config('mail.from.name'))
            ->salutation('Vänligen, Bridgestars');
    }
}
