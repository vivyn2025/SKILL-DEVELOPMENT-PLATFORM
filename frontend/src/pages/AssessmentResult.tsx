import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Award, TrendingUp, BookOpen, ArrowRight, Trophy, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssessmentResultData {
    assessmentId: string;
    skillName: string;
    totalQuestions: number;
    correctAnswers: number;
    scorePercentage: number;
    totalMarks: number;
    obtainedMarks: number;
}

const AssessmentResultPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState<AssessmentResultData | null>(null);
    const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);

    useEffect(() => {
        // Fetch result from localStorage or API
        const storedResult = localStorage.getItem(`assessment_result_${id}`);
        if (storedResult) {
            const data = JSON.parse(storedResult);
            setResult(data);
            generateRecommendations(data.scorePercentage, data.skillName);
        }
    }, [id]);

    const generateRecommendations = (score: number, skillName: string) => {
        let level = '';
        let courses: any[] = [];

        if (score >= 90) {
            level = 'Expert';
            courses = [
                {
                    title: `Advanced ${skillName} Patterns`,
                    description: 'Master advanced architectural patterns and best practices',
                    difficulty: 'Advanced',
                    duration: '8 weeks'
                },
                {
                    title: `${skillName} Performance Optimization`,
                    description: 'Learn to build highly performant applications',
                    difficulty: 'Expert',
                    duration: '6 weeks'
                }
            ];
        } else if (score >= 75) {
            level = 'Advanced';
            courses = [
                {
                    title: `${skillName} Deep Dive`,
                    description: 'Explore advanced concepts and real-world applications',
                    difficulty: 'Advanced',
                    duration: '10 weeks'
                },
                {
                    title: `Building Production Apps with ${skillName}`,
                    description: 'Create enterprise-grade applications',
                    difficulty: 'Intermediate-Advanced',
                    duration: '12 weeks'
                }
            ];
        } else if (score >= 60) {
            level = 'Intermediate';
            courses = [
                {
                    title: `${skillName} Intermediate Course`,
                    description: 'Strengthen your core understanding and build confidence',
                    difficulty: 'Intermediate',
                    duration: '8 weeks'
                },
                {
                    title: `Practical ${skillName} Projects`,
                    description: 'Learn by building real-world projects',
                    difficulty: 'Intermediate',
                    duration: '10 weeks'
                }
            ];
        } else if (score >= 40) {
            level = 'Beginner-Intermediate';
            courses = [
                {
                    title: `${skillName} Fundamentals Bootcamp`,
                    description: 'Solidify your foundation with comprehensive coverage',
                    difficulty: 'Beginner',
                    duration: '12 weeks'
                },
                {
                    title: `${skillName} Core Concepts`,
                    description: 'Focus on essential concepts and practical exercises',
                    difficulty: 'Beginner-Intermediate',
                    duration: '8 weeks'
                }
            ];
        } else {
            level = 'Beginner';
            courses = [
                {
                    title: `Introduction to ${skillName}`,
                    description: 'Start from scratch with hands-on learning',
                    difficulty: 'Beginner',
                    duration: '10 weeks'
                },
                {
                    title: `${skillName} for Beginners`,
                    description: 'Build a strong foundation step-by-step',
                    difficulty: 'Beginner',
                    duration: '12 weeks'
                }
            ];
        }

        setRecommendedCourses(courses);
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-500';
        if (score >= 75) return 'text-blue-500';
        if (score >= 60) return 'text-yellow-500';
        if (score >= 40) return 'text-orange-500';
        return 'text-red-500';
    };

    const getScoreMessage = (score: number) => {
        if (score >= 90) return 'Outstanding! You have mastered this skill!';
        if (score >= 75) return 'Excellent work! You have a strong understanding.';
        if (score >= 60) return 'Good job! Keep practicing to improve further.';
        if (score >= 40) return 'Not bad! Focus on strengthening your fundamentals.';
        return 'Keep learning! Everyone starts somewhere.';
    };

    const getPerformanceInsight = (score: number) => {
        if (score >= 90) return 'You are in the top 10% of learners! Consider advanced topics or teaching others.';
        if (score >= 75) return 'You are performing above average. Advanced courses will help you reach expert level.';
        if (score >= 60) return 'You have a solid foundation. Intermediate courses will build on your knowledge.';
        if (score >= 40) return 'You understand the basics. More practice will improve your confidence.';
        return 'Focus on fundamentals first. Beginner courses will give you a strong start.';
    };

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading results...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <Sidebar />
            <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6">
                <div className="max-w-5xl mx-auto space-y-6">
                    {/* Header with Score */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass rounded-2xl p-8 text-center space-y-4"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <Trophy className="w-16 h-16 text-yellow-500" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk']">Assessment Complete!</h1>
                        <p className="text-base sm:text-lg text-muted-foreground">{result.skillName}</p>

                        <div className={cn("text-5xl sm:text-6xl md:text-7xl font-bold mb-2", getScoreColor(result.scorePercentage))}>
                            {result.scorePercentage}%
                        </div>

                        <p className="text-lg sm:text-xl font-semibold">{getScoreMessage(result.scorePercentage)}</p>

                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 max-w-2xl mx-auto">
                            <div className="glass-strong rounded-xl p-2 sm:p-3 md:p-4">
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-green-500 mb-1">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-xs sm:text-sm font-medium">Correct</span>
                                </div>
                                <div className="text-xl sm:text-2xl font-bold">{result.correctAnswers}</div>
                            </div>
                            <div className="glass-strong rounded-xl p-2 sm:p-3 md:p-4">
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-red-500 mb-1">
                                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-xs sm:text-sm font-medium">Incorrect</span>
                                </div>
                                <div className="text-xl sm:text-2xl font-bold">{result.totalQuestions - result.correctAnswers}</div>
                            </div>
                            <div className="glass-strong rounded-xl p-2 sm:p-3 md:p-4">
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-blue-500 mb-1">
                                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-xs sm:text-sm font-medium">Score</span>
                                </div>
                                <div className="text-xl sm:text-2xl font-bold">{result.obtainedMarks}/{result.totalMarks}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Performance Analysis */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-2xl p-6 space-y-4"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <h2 className="text-lg sm:text-xl font-bold font-['Space_Grotesk']">Performance Analysis</h2>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Your Score</span>
                                <span className="font-semibold">{result.scorePercentage}%</span>
                            </div>
                            <Progress value={result.scorePercentage} className="h-3 rounded-full" />
                        </div>

                        <div className="glass-strong rounded-xl p-4">
                            <p className="text-sm leading-relaxed">{getPerformanceInsight(result.scorePercentage)}</p>
                        </div>
                    </motion.div>

                    {/* Recommended Courses */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="glass rounded-2xl p-6 space-y-4"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <h2 className="text-lg sm:text-xl font-bold font-['Space_Grotesk']">Recommended Learning Path</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {recommendedCourses.map((course, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="glass-strong rounded-xl p-5 space-y-3 hover:border-primary/50 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="w-5 h-5 text-primary-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {course.description}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span className="px-2 py-1 rounded-md bg-primary/10 text-primary">
                                                    {course.difficulty}
                                                </span>
                                                <span>{course.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                    >
                        <Link to="/dashboard">
                            <Button variant="outline" size="lg" className="rounded-xl w-full sm:w-auto text-sm sm:text-base">
                                Back to Dashboard
                            </Button>
                        </Link>
                        <Link to="/learning-path">
                            <Button size="lg" className="gradient-primary border-0 rounded-xl w-full sm:w-auto text-sm sm:text-base">
                                View Learning Path <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default AssessmentResultPage;
