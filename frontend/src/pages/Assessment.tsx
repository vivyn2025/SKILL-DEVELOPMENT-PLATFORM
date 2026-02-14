import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockAssessment } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const AssessmentPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(mockAssessment.duration * 60);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const questions = mockAssessment.questions;
  const progress = ((currentQ + 1) / questions.length) * 100;

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setShowModal(false);
    const correct = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
    toast({ title: `Assessment Complete! Score: ${correct}/${questions.length}` });
  }, [answers, questions, toast]);

  if (submitted) {
    const correct = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
    return (
      <div className="min-h-screen">
        <Navbar />
        <Sidebar />
        <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6 flex items-center justify-center min-h-screen">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass rounded-2xl p-10 text-center max-w-md space-y-4">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold font-['Space_Grotesk']">Assessment Complete!</h2>
            <p className="text-muted-foreground">You scored <span className="text-primary font-bold">{correct}</span> out of <span className="font-bold">{questions.length}</span></p>
            <div className="text-4xl font-bold gradient-text">{Math.round((correct / questions.length) * 100)}%</div>
          </motion.div>
        </main>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold font-['Space_Grotesk']">{mockAssessment.title}</h1>
              <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
            </div>
            <div className={cn('flex items-center gap-2 px-4 py-2 rounded-xl glass', timeLeft < 60 && 'text-destructive')}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <Progress value={progress} className="h-2 rounded-full" />

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass rounded-2xl p-8 space-y-6"
            >
              <h2 className="text-lg font-semibold">{q.text}</h2>
              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers({ ...answers, [currentQ]: i })}
                    className={cn(
                      'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
                      answers[currentQ] === i
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                    )}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setCurrentQ((c) => c - 1)} disabled={currentQ === 0} className="rounded-xl">
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            {currentQ < questions.length - 1 ? (
              <Button onClick={() => setCurrentQ((c) => c + 1)} className="gradient-primary border-0 rounded-xl">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={() => setShowModal(true)} className="gradient-primary border-0 rounded-xl">Submit</Button>
            )}
          </div>
        </div>
      </main>

      {/* Submit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-2xl p-8 max-w-sm w-full mx-4 space-y-4"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold font-['Space_Grotesk']">Submit Assessment?</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You've answered {Object.keys(answers).length} of {questions.length} questions.
                {Object.keys(answers).length < questions.length && ' Some questions are unanswered.'}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button className="flex-1 gradient-primary border-0 rounded-xl" onClick={handleSubmit}>Confirm</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssessmentPage;
