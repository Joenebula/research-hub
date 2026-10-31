'use client';

/**
 * THE CARDS EVERY EDIT PAGE ENDS WITH (D-075): Undo, then Delete. Shared, so
 * venues, artists, promoters and the rest say the same things the same way.
 *
 * Each takes the page's own server action; the action decides — the card only
 * draws the button and says what came back.
 */
import { useActionState } from 'react';
import { Trash2 } from 'lucide-react';
import { Alert, Button, Card } from './core';
import { ConfirmDialog } from './client';

type Said = { status: string; message: string };
type Action<S extends Said> = (previous: S, formData: FormData) => Promise<S>;
/** Each page's action has its own state type; the card needs only status and message. */
const plain = <S extends Said>(a: Action<S>) =>
  a as unknown as (previous: Said, formData: FormData) => Promise<Said>;

/** Says what an action answered, in a region that is always mounted. */
export function Outcome({ state, pending }: { state: Said; pending?: boolean }) {
  return (
    <div role="status" aria-live="polite" style={{ marginTop: state.message ? 16 : 0 }}>
      {!pending && state.status !== 'idle' && state.message && (
        <Alert
          tone={
            state.status === 'invalid'
              ? 'danger'
              : state.status === 'partial'
                ? 'warning'
                : 'success'
          }
        >
          {state.message}
        </Alert>
      )}
    </div>
  );
}

/**
 * Undo the newest change, if it may be undone (D-027): the form carries the id
 * of the change the page was SHOWING, so a stale tab cannot undo somebody
 * else's newer work. Absent when there is nothing to undo; kept while it has
 * something to say (undoing removes the thing to undo — G-042).
 */
export function UndoCard<S extends Said>({
  action,
  initial,
  id,
  auditId,
}: {
  action: Action<S>;
  initial: S;
  id: string;
  auditId: string | null;
}) {
  const [state, undo, undoing] = useActionState(plain(action), initial as Said);
  if (!auditId && state.status === 'idle') return null;
  return (
    <Card title="Undo" subtitle="Puts back the last change recorded in the audit log">
      {auditId && (
        <form action={undo}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="audit_id" value={auditId} />
          <Button type="submit" variant="ghost" loading={undoing}>
            Undo the last change
          </Button>
        </form>
      )}
      <Outcome state={state} pending={undoing} />
    </Card>
  );
}

/**
 * Delete, for good — offered only where nothing uses the record (`blocked`
 * says why not, in words, instead of a button that can only refuse). Asks
 * first, naming the record; the action checks again regardless.
 */
export function DeleteCard<S extends Said>({
  action,
  initial,
  id,
  name,
  what,
  blocked,
  instead,
  consequences = ['Its page on the site', 'Its picture and links'],
}: {
  action: Action<S>;
  initial: S;
  id: string;
  name: string;
  /** "venue", "artist" … */
  what: string;
  /** Why it cannot be deleted, or null when it can. */
  blocked: string | null;
  /** The reversible alternative ("Make it a draft instead"). */
  instead: string;
  /** What goes with it, listed in the dialog. */
  consequences?: string[];
}) {
  const [state, remove, removing] = useActionState(plain(action), initial as Said);
  const formId = `delete-${id}`;
  return (
    <Card title={`Delete this ${what}`}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <p className="ak-field__hint" style={{ maxWidth: '56ch' }}>
          {blocked ?? `Removes “${name}” for good. This cannot be undone. ${instead}`}
        </p>
        {!blocked && (
          <>
            <form action={remove} id={formId}>
              <input type="hidden" name="id" value={id} />
            </form>
            <ConfirmDialog
              title={`Delete “${name}”?`}
              description={`This removes the ${what} for everyone. It cannot be undone.`}
              consequences={consequences}
              confirmText={name}
              confirmLabel={`Delete ${what}`}
              formId={formId}
              busy={removing}
              trigger={(open) => (
                <Button variant="danger" icon={Trash2} onClick={open}>
                  {`Delete ${what}`}
                </Button>
              )}
            />
          </>
        )}
      </div>
      <Outcome state={state} pending={removing} />
    </Card>
  );
}
