'use client';

import * as React from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { inquiryTypes } from '@/lib/data';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const DEFAULT_INQUIRY = inquiryTypes[0]?.value ?? 'Autre';

export function ContactForm() {
  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [feedback, setFeedback] = React.useState('');
  const [inquiryType, setInquiryType] = React.useState<string>(DEFAULT_INQUIRY);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!ACCESS_KEY) {
      setStatus('error');
      setFeedback(
        "Le formulaire n'est pas encore configuré. Écrivez-moi directement à jeffmenie@icloud.com.",
      );
      return;
    }

    setStatus('submitting');
    setFeedback('');

    const formData = new FormData(form);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: 'Portfolio — MENIE MILAMA Rod',
          subject: `[Portfolio] ${inquiryType} — ${String(formData.get('nom') ?? '')}`,
          nom: formData.get('nom'),
          entreprise: formData.get('entreprise'),
          email: formData.get('email'),
          telephone: formData.get('telephone'),
          type_de_besoin: inquiryType,
          message: formData.get('message'),
          botcheck: formData.get('botcheck'),
        }),
      });

      const result: unknown = await response.json();
      const success =
        response.ok &&
        typeof result === 'object' &&
        result !== null &&
        (result as { success?: boolean }).success === true;

      if (!success) {
        throw new Error("La requête n'a pas abouti.");
      }

      form.reset();
      setInquiryType(DEFAULT_INQUIRY);
      setStatus('success');
      setFeedback('Message envoyé. Je vous réponds sous 24 heures ouvrées.');
    } catch {
      setStatus('error');
      setFeedback(
        "L'envoi a échoué. Réessayez dans un instant ou écrivez-moi à jeffmenie@icloud.com.",
      );
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Piege a robots — invisible pour les utilisateurs */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nom">
            Nom <span className="text-primary">*</span>
          </Label>
          <Input
            id="nom"
            name="nom"
            type="text"
            required
            autoComplete="name"
            placeholder="Votre nom"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="entreprise">Entreprise / Organisation</Label>
          <Input
            id="entreprise"
            name="entreprise"
            type="text"
            autoComplete="organization"
            placeholder="Optionnel"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-primary">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@entreprise.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            placeholder="Optionnel"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type-de-besoin">
          Type de besoin <span className="text-primary">*</span>
        </Label>
        <Select value={inquiryType} onValueChange={setInquiryType}>
          <SelectTrigger id="type-de-besoin" aria-label="Type de besoin">
            <SelectValue placeholder="Sélectionnez un type de besoin" />
          </SelectTrigger>
          <SelectContent>
            {inquiryTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Décrivez votre contexte, votre besoin et vos délais."
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Envoi en cours
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Envoyer le message
          </>
        )}
      </Button>

      {/* Le conteneur reste monte en permanence pour que les lecteurs d'ecran
          annoncent le changement de statut. */}
      <div role="status" aria-live="polite">
        {status === 'success' ? (
          <p className="flex items-start gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {feedback}
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
