import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { clsx } from 'clsx'

interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
  className?: string
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className
}) => {
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = onStepClick && index <= currentStep

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <motion.button
                  whileHover={isClickable ? { scale: 1.05 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                  onClick={isClickable ? () => onStepClick(index) : undefined}
                  className={clsx(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200',
                    isCompleted
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : isCurrent
                      ? 'bg-white border-primary-500 text-primary-500'
                      : 'bg-gray-100 border-gray-300 text-gray-500',
                    isClickable ? 'cursor-pointer hover:shadow-md' : 'cursor-default'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </motion.button>
                
                <div className="mt-2 text-center">
                  <h3 className={clsx(
                    'text-sm font-medium',
                    isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-500'
                  )}>
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                  )}
                </div>
              </div>
              
              {/* 接続線 */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 relative">
                  <div className="absolute inset-0 bg-gray-200 rounded-full" />
                  <motion.div
                    className="absolute inset-0 bg-primary-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index < currentStep ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ProgressStepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep,
  className
}) => {
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className={clsx('w-full', className)}>
      {/* プログレスバー */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">
            ステップ {currentStep + 1} / {steps.length}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* ステップリスト */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={clsx(
                'flex items-center p-4 rounded-lg transition-all duration-200',
                isCurrent
                  ? 'bg-primary-50 border border-primary-200'
                  : isCompleted
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              )}
            >
              <div className={clsx(
                'flex items-center justify-center w-8 h-8 rounded-full mr-4',
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              )}>
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={clsx(
                  'font-medium',
                  isCurrent ? 'text-primary-900' : isCompleted ? 'text-green-900' : 'text-gray-700'
                )}>
                  {step.title}
                </h3>
                {step.description && (
                  <p className={clsx(
                    'text-sm mt-1',
                    isCurrent ? 'text-primary-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                  )}>
                    {step.description}
                  </p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
